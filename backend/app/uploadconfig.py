ALLOWED_EXTENSIONS = set(['csv', 'xlsx'])

def allowed_files(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS