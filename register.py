from kivy.uix.screenmanager import Screen
from kivy.properties import ObjectProperty
from kivy.uix.popup import Popup
from kivy.uix.label import Label
from auth import register_user

class RegisterScreen(Screen):
    name_input = ObjectProperty(None)
    email_input = ObjectProperty(None)
    password_input = ObjectProperty(None)

    def register(self):
        name = self.name_input.text
        email = self.email_input.text
        password = self.password_input.text
        success, msg = register_user(name, email, password)
        if success:
            self.manager.current = 'login'
        self.show_popup("Register", msg)

    def go_to_login(self):
        self.manager.current = 'login'

    def show_popup(self, title, message):
        popup = Popup(title=title, content=Label(text=message), size_hint=(0.6, 0.3))
        popup.open()
