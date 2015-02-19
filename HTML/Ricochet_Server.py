from tornado import websocket, web, ioloop, httpserver
import tornado, json

userIP = dict()

def CheckJoin(self):
	msg=dict()
	if len(userIP.keys()) < 2:
		userIP[self.request.remote_ip] = self
		msg["type"]="Joined"; #set your type here
		if len(userIP.keys())  == 1:
			msg["data"]="WAITING_FOR_PLAYERS";
			msg["ID"] = 0
			msg=json.dumps(msg)
			self.write_message(msg)
		else:
			msg["data"]="STARTING_GAME";
			msg["ID"] = 1
			sendToAll(msg)
	else:
		msg["type"]="Join UnsuccessFul - Session Full"
		self.write_message(msg)

def sendBulletToOtherPlayer(self, R):
	for key in userIP:
		if key != self.request.remote_ip:
			#Creates the dictionary
			msg=dict()
			
			#Populates the message
			msg["type"] = "Bullet"
			msg["Pos"] = {"X":R["Pos"]["X"], "Y":R["Pos"]["Y"]}
			msg["Direction"] = 0;
			msg["IP"] = self.request.remote_ip
			
			#Dumps the message and send it
			msg=json.dumps(msg)
			userIP[key].write_message(msg)
			print("Bullet Sent To: " + self.request.remote_ip)
			
def sendPositionToOtherPlayer(self, R):
	for key in userIP:
		if key != self.request.remote_ip:
			#Creates the dictionary
			msg=dict()
			
			#Populates the message
			msg["type"] = "Movement"
			msg["Pos"] = {"X":R["Pos"]["X"], "Y":R["Pos"]["Y"]}
			msg["Life"] = 3;
			msg["IP"] = self.request.remote_ip
			
			#Dumps the message and send it
			msg=json.dumps(msg)
			userIP[key].write_message(msg)
			print("Message Sent To: " + self.request.remote_ip)

#Extends the tornado websocket handler
class WSHandler(tornado.websocket.WebSocketHandler):
	def check_origin(self,origin):
		return True

	def open(self):
		print("Websocket - Connection Opened")
		
	def on_close(self):
		print("Websocket - Connection Closed")

	def on_message(self, message):
		R = json.loads(message)
		if R['request'] == 'join':
			CheckJoin(self)
		if R['request'] == "Movement":
			sendPositionToOtherPlayer(self, R)
		if R['request'] == "Spawn Bullet":
			sendBulletToOtherPlayer(self, R)

app = tornado.web.Application([
	(r'/test', WSHandler),
	])

if __name__ == '__main__':
	#what is 8080 ?
	app.listen(8080)
	tornado.ioloop.IOLoop.instance().start()
