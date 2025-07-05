from kivy.uix.screenmanager import Screen
from kivy.properties import ObjectProperty
from db import connect_db
from kivy.uix.popup import Popup
from kivy.uix.label import Label

class BookCabScreen(Screen):
    pickup_input = ObjectProperty(None)
    drop_input = ObjectProperty(None)
    time_input = ObjectProperty(None)
    cab_input = ObjectProperty(None)
    user_id = None

    def submit_booking(self):
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO cab_booking (user_id, pickup_location, drop_location, pickup_time, cab_type) VALUES (%s, %s, %s, %s, %s)", (
            self.user_id,
            self.pickup_input.text,
            self.drop_input.text,
            self.time_input.text,
            self.cab_input.text
        ))
        conn.commit()
        conn.close()
        self.show_popup("Cab Booked!", "Your cab has been booked.")

    def show_popup(self, title, message):
        popup = Popup(title=title, content=Label(text=message), size_hint=(0.6, 0.3))
        popup.open()
