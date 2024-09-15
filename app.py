from flask import Flask, render_template
from flask_flatpages import FlatPages

POST_DIR = "posts"

app = Flask(__name__)
app.config.from_pyfile('settings.cfg')
pages = FlatPages(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/blog/')
def blog():
    posts = [post for post in pages if post.path.startswith(POST_DIR)]
    posts.sort(key=lambda item:item['date'], reverse=False)
    return render_template('blog.html', posts=posts)


@app.route('/blog/<name>')
def post(name):
    path = f'{POST_DIR}/{name}'
    post = pages.get_or_404(path)
    return render_template('post.html', post=post)
