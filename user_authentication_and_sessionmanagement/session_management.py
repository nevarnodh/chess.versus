@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login'))

