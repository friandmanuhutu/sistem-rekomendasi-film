from flask import Flask, request, jsonify, render_template
import pandas as pd

app = Flask(__name__)

# Membaca data dari file CSV
df = pd.read_csv('movies.csv')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/movies')
def get_movies():
    movies = df.to_dict(orient='records')
    return jsonify(movies)

@app.route('/recommend', methods=['POST'])
def recommend():
    genre = request.form['genre']
    if genre == 'Semua':
        movies = df.to_dict(orient='records')
    else:
        filtered_movies = df[df['Genre'] == genre]
        movies = filtered_movies.to_dict(orient='records')
    return jsonify(movies)

if __name__ == '__main__':
    app.run(debug=True)
