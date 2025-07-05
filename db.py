# db.py
import mysql.connector

def connect_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",              # Replace with your MySQL username
        password="asma239", # Replace with your MySQL password
        database="TravelEase"
    )
