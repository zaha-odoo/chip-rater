let Component = owl.Component
let useState = owl.useState
let mount = owl.mount
let onMounted = owl.onMounted
let xml = owl.xml

class AuthProvider extends Component {
    setup() {
        this.state = useState({
            identity: null
        })

        onMounted(() => {
            google.accounts.id.initialize({
                client_id: "769622060814-slsc9skskd5cfs3tu6uuiliovj719caf.apps.googleusercontent.com",
                callback: this.handleCredentialResponse.bind(this),
                auto_select: true,
            })
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
            )
            google.accounts.id.prompt() // also display the One Tap dialog
        })
    }

    b64DecodeUnicode(str) {
        return decodeURIComponent(
            Array.prototype.map.call(atob(str), c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''))
    }

    parseJwt(token) {
        return JSON.parse(
            this.b64DecodeUnicode(
                token.split('.')[1].replace('-', '+').replace('_', '/')
            )
        )
    }

    handleCredentialResponse(response) {
        this.state.identity = this.parseJwt(response.credential)
        console.log(this.state)
    }
}

class Indicator extends Component {
    static template = xml`
        <p>
            <t t-if="this.props.identity">
                You are logged in as <t t-esc="this.props.identity.name"/>.
            </t>
            <t t-else="">
                You are not logged in.
            </t>
        </p>`;
}

class Root extends AuthProvider {
    static template = xml`
        <div>
            <Indicator identity="state.identity"></Indicator>
            <div id="buttonDiv"></div>
        </div>`;
    static components = { Indicator };
}

mount(Root, document.getElementById("root"), { dev: true });