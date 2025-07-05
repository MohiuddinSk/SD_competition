from kivy.uix.screenmanager import Screen
from kivy.properties import ObjectProperty
from kivy.uix.popup import Popup
from kivy.uix.label import Label
from auth import login_user

class LoginScreen(Screen):
    email_input = ObjectProperty(None)
    password_input = ObjectProperty(None)

    def login(self):
        email = self.email_input.text
        password = self.password_input.text
        success, user_id, user_name = login_user(email, password)
        if success:
            self.manager.get_screen('dashboard').user_name = user_name
            self.manager.current = 'dashboard'
        else:
            self.show_popup("Login Failed", "Invalid email or password.")

    def go_to_register(self):
        self.manager.current = 'register'

    def show_popup(self, title, message):
        popup = Popup(title=title, content=Label(text=message), size_hint=(0.6, 0.3))
        popup.open()
