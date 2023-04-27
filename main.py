from flask import Flask, session, render_template, request, redirect, url_for

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/login', methods=['POST'])
def login():
    print(request.form)

    return redirect(url_for('index'))

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
