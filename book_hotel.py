from kivy.uix.screenmanager import Screen
from kivy.properties import ObjectProperty
from db import connect_db
from kivy.uix.popup import Popup
from kivy.uix.label import Label

class BookHotelScreen(Screen):
    city_input = ObjectProperty(None)
    checkin_input = ObjectProperty(None)
    checkout_input = ObjectProperty(None)
    guests_input = ObjectProperty(None)
    room_input = ObjectProperty(None)
    user_id = None

    def submit_booking(self):
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO hotel_booking (user_id, city, check_in, check_out, guests, room_type) VALUES (%s, %s, %s, %s, %s, %s)", (
            self.user_id,
            self.city_input.text,
            self.checkin_input.text,
            self.checkout_input.text,
            self.guests_input.text,
            self.room_input.text
        ))
        conn.commit()
        conn.close()
        self.show_popup("Hotel Booked!", "Your hotel has been booked.")

    def show_popup(self, title, message):
        popup = Popup(title=title, content=Label(text=message), size_hint=(0.6, 0.3))
        popup.open()
