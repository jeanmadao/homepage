from flask import Flask, render_template
from flask_flatpages import FlatPages, pygments_style_defs

POST_DIR = "posts"
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'blog'
FLATPAGES_MARKDOWN_EXTENSIONS = ['fenced_code', 'codehilite']

app = Flask(__name__)
app.config.from_object(__name__)
pages = FlatPages(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/blog/')
def blog():
    posts = (post for post in pages)
    latest = sorted(posts, reverse=True, key=lambda p: p.meta['date'])
    return render_template('blog.html', posts=latest)


@app.route('/blog/<name>')
def post(name):
    path = f'{POST_DIR}/{name}'
    post = pages.get_or_404(path)
    return render_template('post.html', post=post)

@app.route('/pygments.css')
def pygments_css():
    return pygments_style_defs('gruvbox-dark'), 200, {'Content-Type': 'text/css'}
