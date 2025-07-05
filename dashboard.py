from kivy.uix.screenmanager import Screen
from kivy.properties import StringProperty

class DashboardScreen(Screen):
    user_name = StringProperty("")

    def logout(self):
        self.manager.current = 'login'
