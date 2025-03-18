class CiscoDevice:
    def __init__(self, device_type, name, ip):
        self.device_type = device_type
        self.name = name
        self.ip = ip

    def __repr__(self):
        return f"{self.device_type}({self.name}, {self.ip})"
