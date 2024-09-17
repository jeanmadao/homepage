# homepage
> [!NOTE]
> Keep in mind this website is still under construction!

## Introduction
This my personal website. It is built with
[Flask](https://flask.palletsprojects.com/en/3.0.x/) and
[htmx](https://htmx.org/). This website theme uses the
[gruvbox](https://github.com/morhetz/gruvbox) colorscheme.

## Dependencies
It is listed in the `requirements.txt`.

```txt
Flask==3.0.3
Flask-FlatPages==0.8.2
Pygments==2.18.0
```

You can easily install the dependencies using Python Virtual Environment.

```sh
python -m venv .venv #create a new Virtual Environment
source .venv/bin/activate #activate the newly created venv
pip install -r requirements.txt #install the dependencies with PIP
```

## Run

```sh
flask --app app.py --debug run #run flask in debug mode
```

## Visit the website!
You can visit the website at [https://refeilong.com/](https://refeilong.com/)

