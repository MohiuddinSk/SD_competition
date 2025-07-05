from kivy.uix.screenmanager import Screen
from kivy.properties import ObjectProperty
from db import connect_db
from kivy.uix.popup import Popup
from kivy.uix.label import Label

class BookFlightScreen(Screen):
    from_input = ObjectProperty(None)
    to_input = ObjectProperty(None)
    date_input = ObjectProperty(None)
    seats_input = ObjectProperty(None)
    class_input = ObjectProperty(None)
    user_id = None

    def submit_booking(self):
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO flight_booking (user_id, from_airport, to_airport, journey_date, seats, travel_class) VALUES (%s, %s, %s, %s, %s, %s)", (
            self.user_id,
            self.from_input.text,
            self.to_input.text,
            self.date_input.text,
            self.seats_input.text,
            self.class_input.text
        ))
        conn.commit()
        conn.close()
        self.show_popup("Flight Booked!", "Your flight has been booked.")

    def show_popup(self, title, message):
        popup = Popup(title=title, content=Label(text=message), size_hint=(0.6, 0.3))
        popup.open()
