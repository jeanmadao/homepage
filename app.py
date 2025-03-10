from flask import Flask, render_template, send_file
from flask_flatpages import FlatPages, pygments_style_defs
from flask import send_from_directory
import os


POST_DIR = "posts"
UPLOADS_DIR = "uploads"
MALICIOUS_DIR = "malicious"
PICTURES_DIR = "pictures"
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

@app.route('/uploads')
def uploads():
    path = f'{UPLOADS_DIR}/MyDynamicClass.dex'
    return send_file(path, as_attachment=True, mimetype="image/jpeg")

@app.route('/malicious')
def malicious():
    path = f'{MALICIOUS_DIR}/MyMaliciousClass.dex'
    return send_file(path, as_attachment=True, mimetype="image/jpeg")

@app.route('/pictures')
def pictures():
    path = f'{PICTURES_DIR}/pic.png'
    return send_file(path, as_attachment=True, mimetype="image/png")

@app.route('/pygments.css')
def pygments_css():
    return pygments_style_defs('gruvbox-dark'), 200, {'Content-Type': 'text/css'}

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

