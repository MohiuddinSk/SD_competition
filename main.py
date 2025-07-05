from kivy.app import App
from kivy.uix.screenmanager import ScreenManager
from kivy.lang import Builder
import os

# Import all screens
from screens.login import LoginScreen
from screens.register import RegisterScreen
from screens.dashboard import DashboardScreen

from screens.book_train import BookTrainScreen
from screens.book_flights import BookFlightScreen
from screens.book_bus import BookBusScreen
from screens.book_cab import BookCabScreen
from screens.book_hotel import BookHotelScreen

# Load KV files
kv_dir = os.path.join(os.path.dirname(__file__), "kv")

Builder.load_file(os.path.join(kv_dir, "login.kv"))
Builder.load_file(os.path.join(kv_dir, "register.kv"))
Builder.load_file(os.path.join(kv_dir, "dashboard.kv"))

Builder.load_file(os.path.join(kv_dir, "book_train.kv"))
Builder.load_file(os.path.join(kv_dir, "book_flight.kv"))
Builder.load_file(os.path.join(kv_dir, "book_bus.kv"))
Builder.load_file(os.path.join(kv_dir, "book_cab.kv"))
Builder.load_file(os.path.join(kv_dir, "book_hotel.kv"))

class TravelEaseApp(App):
    def build(self):
        sm = ScreenManager()

        # Core screens
        sm.add_widget(LoginScreen(name="login"))
        sm.add_widget(RegisterScreen(name="register"))
        sm.add_widget(DashboardScreen(name="dashboard"))

        # Booking screens
        sm.add_widget(BookTrainScreen(name="book_train"))
        sm.add_widget(BookFlightScreen(name="book_flight"))
        sm.add_widget(BookBusScreen(name="book_bus"))
        sm.add_widget(BookCabScreen(name="book_cab"))
        sm.add_widget(BookHotelScreen(name="book_hotel"))

        return sm

if __name__ == "__main__":
    TravelEaseApp().run()
