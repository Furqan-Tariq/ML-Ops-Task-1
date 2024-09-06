from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)

# Enable CORS for the app
CORS(app)

# Load the trained model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)
@app.route('/')
def home():
    return "Welcome to the model API! Use the /predict endpoint to make predictions."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        prediction = model.predict([data['features']])
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred during prediction'}), 500

if __name__ == '__main__':
    app.run(debug=True)
