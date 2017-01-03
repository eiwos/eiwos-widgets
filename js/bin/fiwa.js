// Generated by Haxe 3.4.0
(function () { "use strict";
var HxOverrides = function() { };
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var fiwa_Fiwa = function() {
	this.game = new fiwa_extraiwa_Game();
	this.player = new fiwa_extraiwa_Player();
	this.extraiwa = new fiwa_extraiwa_Extraiwa();
	this.iwa = new fiwa_Iwa();
};
fiwa_Fiwa.main = function() {
};
var fiwa_Iwa = function() {
	this.channels_format = new haxe_ds_StringMap();
	this.frames_apis = new haxe_ds_StringMap();
	this.url = window.location.href;
	this.functions = new haxe_ds_StringMap();
	this.frames = null;
	window.addEventListener("message",$bind(this,this.on_msg),false);
};
fiwa_Iwa.main = function() {
	new fiwa_Iwa();
};
fiwa_Iwa.prototype = {
	init_frame: function(id,url,back_color,back_img) {
		this.frames.push([url,id]);
		this.set_backround_color(id,back_color);
		this.set_backround_image(id,back_img);
		window.document.getElementById(id).contentWindow.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin","<script>var parenturl = '" + this.url + "';</script>");
	}
	,force_origin: function(id) {
		var frame = window.document.getElementById(id).contentWindow;
		var _g = 0;
		var _g1 = this.frames;
		while(_g < _g1.length) {
			var frameid = _g1[_g];
			++_g;
			if(frameid[1] == id) {
				if(frame.src != frameid[0]) {
					frame.src = frameid[0];
				}
				break;
			}
		}
	}
	,send_to_channel: function(channelid,msg) {
		var final_msg = [channelid,msg];
		var _g = 0;
		var _g1 = this.frames;
		while(_g < _g1.length) {
			var id = _g1[_g];
			++_g;
			window.document.getElementById(id[1]).contentWindow.postMessage(final_msg,window.location.href);
		}
	}
	,send_to_origin: function(origin,msg,channelid) {
		var final_msg = [channelid,msg];
		var _g = 0;
		var _g1 = this.frames;
		while(_g < _g1.length) {
			var id = _g1[_g];
			++_g;
			if(id[0] == origin) {
				window.document.getElementById(id[1]).contentWindow.postMessage(final_msg,window.location.href);
			}
		}
	}
	,send_to_frame: function(id,msg,channelid) {
		window.document.getElementById(id).contentWindow.postMessage([channelid,msg],window.location.href);
	}
	,register_frame: function(id,origin) {
		this.frames.push([origin,id]);
	}
	,register_function: function(channelid,the_function) {
		var _this = this.functions;
		var value = the_function;
		if(__map_reserved[channelid] != null) {
			_this.setReserved(channelid,value);
		} else {
			_this.h[channelid] = value;
		}
	}
	,get_frame_apis: function(frameid) {
		var _this = this.frames_apis;
		if(__map_reserved[frameid] != null) {
			return _this.getReserved(frameid);
		} else {
			return _this.h[frameid];
		}
	}
	,get_channel_format: function(channelid) {
		var _this = this.channels_format;
		if(__map_reserved[channelid] != null) {
			return _this.getReserved(channelid);
		} else {
			return _this.h[channelid];
		}
	}
	,all_backround_color: function(color) {
		var _g = 0;
		var _g1 = this.frames;
		while(_g < _g1.length) {
			var id = _g1[_g];
			++_g;
			window.document.getElementById(id[1]).contentWindow.getElementsByTagName("body")[0].style.background = color;
		}
	}
	,all_backround_image: function(url) {
		var _g = 0;
		var _g1 = this.frames;
		while(_g < _g1.length) {
			var id = _g1[_g];
			++_g;
			window.document.getElementById(id[1]).contentWindow.getElementsByTagName("body")[0].style.backgroundImage = "url(" + url + ")";
		}
	}
	,set_backround_color: function(id,color) {
		window.document.getElementById(id).contentWindow.getElementsByTagName("body")[0].style.background = color;
	}
	,set_backround_image: function(id,url) {
		window.document.getElementById(id).contentWindow.getElementsByTagName("body")[0].style.backgroundImage = "url(" + url + ")";
	}
	,on_msg: function(event) {
		var found = false;
		var element_id = null;
		var _g = 0;
		var _g1 = this.frames;
		while(_g < _g1.length) {
			var id = _g1[_g];
			++_g;
			if(id[0] == event.origin) {
				found = true;
				element_id = id[1];
				break;
			}
		}
		if(found == true) {
			if(event.data[1] == null) {
				var key = event.data[0];
				var _this = this.channels_format;
				if(!(__map_reserved[key] != null?_this.existsReserved(key):_this.h.hasOwnProperty(key))) {
					var key1 = event.data[0];
					var value = event.data[4];
					var _this1 = this.channels_format;
					if(__map_reserved[key1] != null) {
						_this1.setReserved(key1,value);
					} else {
						_this1.h[key1] = value;
					}
				}
				var _this2 = this.frames_apis;
				var key2 = event.data[0];
				var value1 = event.data[3];
				var _this3 = __map_reserved[element_id] != null?_this2.getReserved(element_id):_this2.h[element_id];
				if(__map_reserved[key2] != null) {
					_this3.setReserved(key2,value1);
				} else {
					_this3.h[key2] = value1;
				}
			} else {
				var _g2 = 0;
				var key3 = event.data[0];
				var _this4 = this.functions;
				var _g11 = __map_reserved[key3] != null?_this4.getReserved(key3):_this4.h[key3];
				while(_g2 < _g11.length) {
					var the_function = _g11[_g2];
					++_g2;
					the_function(event.data[1],element_id);
				}
			}
		} else {
			console.log("Unstrusted frame mensage recived.");
		}
	}
	,get_frame: function(id) {
		return window.document.getElementById(id).contentWindow;
	}
};
var fiwa_extraiwa_Extraiwa = function() {
	this.iwa = fiwa_Iwa;
	this.frame_finish = [];
	this.frame_playing = [];
	this.frame_loaded = [];
	this.finish_frames = [];
	this.playing_frames = [];
	this.loaded_frames = [];
	this.iwa.register_function("extraiwa",$bind(this,this.onmsg));
	window.addEventListener("DOMContentLoaded",$bind(this,this.onloaded));
};
fiwa_extraiwa_Extraiwa.main = function() {
};
fiwa_extraiwa_Extraiwa.prototype = {
	on_frame_loaded: function(the_function) {
		this.frame_loaded.push(the_function);
	}
	,on_frame_playing: function(the_function) {
		this.frame_playing.push(the_function);
	}
	,on_frame_finish: function(the_function) {
		this.frame_finish.push(the_function);
	}
	,get_frame_extra_apis: function(frameid) {
		var apis = [];
		var channel = this.iwa.get_frame_apis(frameid).keys();
		while(channel.hasNext()) {
			var channel1 = channel.next();
			if(channel1 == "extraiwa") {
				apis.push("extraiwa");
			} else if(channel1 == "extraplayer") {
				apis.push("extraplayer");
			}
		}
		return apis;
	}
	,onloaded: function() {
		this.iwa.send_to_channel("extraiwa",JSON.stringify({ msg : "loaded"}));
	}
	,onmsg: function(data,element_id) {
		var data1 = JSON.parse(data);
		if(data1.msg == "loaded") {
			this.loaded_frames.push(element_id);
			var _g = 0;
			var _g1 = this.frame_loaded;
			while(_g < _g1.length) {
				var the_function = _g1[_g];
				++_g;
				the_function(element_id);
			}
		} else if(data1.msg == "playing") {
			this.playing_frames.push(element_id);
			var _g2 = 0;
			var _g11 = this.frame_playing;
			while(_g2 < _g11.length) {
				var the_function1 = _g11[_g2];
				++_g2;
				the_function1(element_id);
			}
		} else if(data1.msg == "finish") {
			this.finish_frames.push(element_id);
			HxOverrides.remove(this.playing_frames,element_id);
			var _g3 = 0;
			var _g12 = this.frame_finish;
			while(_g3 < _g12.length) {
				var the_function2 = _g12[_g3];
				++_g3;
				the_function2(element_id);
			}
		}
	}
};
var fiwa_extraiwa_Game = function() {
	this.iwa = fiwa_Iwa;
	this.leadboard_functions = new haxe_ds_StringMap();
	this.value_functions = new haxe_ds_StringMap();
	this.mobile_functions = new haxe_ds_StringMap();
	this.game_values = new haxe_ds_StringMap();
	this.leadboards = new haxe_ds_StringMap();
	this.controllers = new haxe_ds_StringMap();
	this.games_info = new haxe_ds_StringMap();
	this.iwa.register_function("extragame",$bind(this,this.onmsg));
};
fiwa_extraiwa_Game.main = function() {
	new fiwa_extraiwa_Game();
};
fiwa_extraiwa_Game.prototype = {
	get_info: function(frameid) {
		var _this = this.games_info;
		if(__map_reserved[frameid] != null) {
			return _this.getReserved(frameid);
		} else {
			return _this.h[frameid];
		}
	}
	,get_controller: function(frameid,name) {
		var _this = this.controllers;
		var _this1 = __map_reserved[frameid] != null?_this.getReserved(frameid):_this.h[frameid];
		if(__map_reserved[name] != null) {
			return _this1.getReserved(name);
		} else {
			return _this1.h[name];
		}
	}
	,set_controller: function(frameid,name,key) {
		this.iwa.send_to_frame(frameid,JSON.stringify({ msg : "set_controller", name : name, key : key}),"extragame");
	}
	,on_mobile: function(frameid,the_function) {
		var _this = this.mobile_functions;
		(__map_reserved[frameid] != null?_this.getReserved(frameid):_this.h[frameid]).push(the_function);
	}
	,set_mobile_controller: function(frameid,value) {
		this.iwa.send_to_frame(frameid,JSON.stringify({ msg : "set_mobile_controller", show : value}),"extragame");
	}
	,set_style: function(frameid,style) {
		this.iwa.send_to_frame(frameid,JSON.stringify({ msg : "set_css", css : style}),"extragame");
	}
	,get_leadboard: function(frameid) {
		var _this = this.leadboards;
		if(__map_reserved[frameid] != null) {
			return _this.getReserved(frameid);
		} else {
			return _this.h[frameid];
		}
	}
	,on_leadboard: function(frameid,the_function) {
		var _this = this.leadboard_functions;
		(__map_reserved[frameid] != null?_this.getReserved(frameid):_this.h[frameid]).push(the_function);
	}
	,get_value: function(frameid,name) {
		var _this = this.game_values;
		var _this1 = __map_reserved[frameid] != null?_this.getReserved(frameid):_this.h[frameid];
		if(__map_reserved[name] != null) {
			return _this1.getReserved(name);
		} else {
			return _this1.h[name];
		}
	}
	,on_value: function(frameid,the_function) {
		var _this = this.value_functions;
		(__map_reserved[frameid] != null?_this.getReserved(frameid):_this.h[frameid]).push(the_function);
	}
	,set_user: function(frameid,name,session) {
		this.iwa.send_to_frame(frameid,JSON.stringify({ msg : "set_user", name : name, session : session}),"extragame");
	}
	,onmsg: function(data,element_id) {
		var data1 = JSON.parse(data);
		if(data1.msg == "set_game_info") {
			var _g1 = 0;
			var _g = data1.info_keys.length;
			while(_g1 < _g) {
				var i = _g1++;
				var _this = this.games_info;
				var key = data1.info_keys[i];
				var value = data1.info_values[i];
				var _this1 = __map_reserved[element_id] != null?_this.getReserved(element_id):_this.h[element_id];
				if(__map_reserved[key] != null) {
					_this1.setReserved(key,value);
				} else {
					_this1.h[key] = value;
				}
			}
		} else if(data1.msg == "set_controllers") {
			var _g11 = 0;
			var _g2 = data1.controllers_names.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				var _this2 = this.controllers;
				var key1 = data1.controllers_names[i1];
				var value1 = data1.controllers_keys[i1];
				var _this3 = __map_reserved[element_id] != null?_this2.getReserved(element_id):_this2.h[element_id];
				if(__map_reserved[key1] != null) {
					_this3.setReserved(key1,value1);
				} else {
					_this3.h[key1] = value1;
				}
			}
		} else if(data1.msg == "update_leadboard") {
			var _g12 = 0;
			var _g3 = data1.leadboard_names.length;
			while(_g12 < _g3) {
				var i2 = _g12++;
				var _this4 = this.leadboards;
				var key2 = data1.leadboard_names[i2];
				var value2 = data1.leadboard_values[i2];
				var _this5 = __map_reserved[element_id] != null?_this4.getReserved(element_id):_this4.h[element_id];
				if(__map_reserved[key2] != null) {
					_this5.setReserved(key2,value2);
				} else {
					_this5.h[key2] = value2;
				}
			}
			var _g4 = 0;
			var _this6 = this.leadboard_functions;
			var _g13 = __map_reserved[element_id] != null?_this6.getReserved(element_id):_this6.h[element_id];
			while(_g4 < _g13.length) {
				var the_function = _g13[_g4];
				++_g4;
				the_function();
			}
		} else if(data1.msg == "update_value") {
			var _this7 = this.game_values;
			var key3 = data1.value_name;
			var value3 = data1.value;
			var _this8 = __map_reserved[element_id] != null?_this7.getReserved(element_id):_this7.h[element_id];
			if(__map_reserved[key3] != null) {
				_this8.setReserved(key3,value3);
			} else {
				_this8.h[key3] = value3;
			}
			var _g5 = 0;
			var _this9 = this.value_functions;
			var _g14 = __map_reserved[element_id] != null?_this9.getReserved(element_id):_this9.h[element_id];
			while(_g5 < _g14.length) {
				var the_function1 = _g14[_g5];
				++_g5;
				the_function1(data1.value_name,data1.value);
			}
		} else if(data1.msg == "set_mobile") {
			var _g6 = 0;
			var _this10 = this.mobile_functions;
			var _g15 = __map_reserved[element_id] != null?_this10.getReserved(element_id):_this10.h[element_id];
			while(_g6 < _g15.length) {
				var the_function2 = _g15[_g6];
				++_g6;
				the_function2();
			}
		}
	}
};
var fiwa_extraiwa_Player = function() {
	this.iwa = fiwa_Iwa;
	this.time_functions = new haxe_ds_StringMap();
	this.players_controls = new haxe_ds_StringMap();
	this.players_sources = new haxe_ds_StringMap();
	this.players_qualities = new haxe_ds_StringMap();
	this.players_videos_info = new haxe_ds_StringMap();
	this.players_videos_duration = new haxe_ds_StringMap();
	this.players_current_time = new haxe_ds_StringMap();
	this.players_status = new haxe_ds_StringMap();
	this.iwa.register_function("extraplayer",$bind(this,this.onmsg));
};
fiwa_extraiwa_Player.main = function() {
	new fiwa_extraiwa_Player();
};
fiwa_extraiwa_Player.prototype = {
	play_video: function(frameid) {
		this.iwa.send_to_frame(frameid,JSON.stringify({ msg : "set_status", status : 1}),"extraplayer");
		var _this = this.players_status;
		if(__map_reserved[frameid] != null) {
			_this.setReserved(frameid,1);
		} else {
			_this.h[frameid] = 1;
		}
	}
	,stop_video: function(frameid) {
		this.iwa.send_to_frame(frameid,JSON.stringify({ msg : "set_status", status : 0}),"extraplayer");
		var _this = this.players_status;
		if(__map_reserved[frameid] != null) {
			_this.setReserved(frameid,0);
		} else {
			_this.h[frameid] = 0;
		}
	}
	,pause_video: function(frameid) {
		this.iwa.send_to_frame(frameid,JSON.stringify({ msg : "set_status", status : 2}),"extraplayer");
		var _this = this.players_status;
		if(__map_reserved[frameid] != null) {
			_this.setReserved(frameid,2);
		} else {
			_this.h[frameid] = 2;
		}
	}
	,get_player_status: function(frameid) {
		var _this = this.players_status;
		if(__map_reserved[frameid] != null) {
			return _this.getReserved(frameid);
		} else {
			return _this.h[frameid];
		}
	}
	,get_video_duration: function(frameid) {
		var _this = this.players_videos_duration;
		if(__map_reserved[frameid] != null) {
			return _this.getReserved(frameid);
		} else {
			return _this.h[frameid];
		}
	}
	,get_current_time: function(frameid) {
		var _this = this.players_current_time;
		if(__map_reserved[frameid] != null) {
			return _this.getReserved(frameid);
		} else {
			return _this.h[frameid];
		}
	}
	,set_time: function(frameid,time) {
		this.iwa.send_to_frame(frameid,JSON.stringify({ msg : "set_time", time : time}),"extraplayer");
		var _this = this.players_current_time;
		if(__map_reserved[frameid] != null) {
			_this.setReserved(frameid,time);
		} else {
			_this.h[frameid] = time;
		}
	}
	,on_time_do: function(frameid,time,the_function) {
		var _this = this.time_functions;
		(__map_reserved[frameid] != null?_this.getReserved(frameid):_this.h[frameid]).h[time] = the_function;
	}
	,set_control_value: function(frameid,control,value) {
		this.iwa.send_to_frame(frameid,JSON.stringify({ msg : "set_control_value", control : control, value : value}),"extraplayer");
		var _this = this.players_controls;
		var _this1 = __map_reserved[frameid] != null?_this.getReserved(frameid):_this.h[frameid];
		if(__map_reserved[control] != null) {
			_this1.setReserved(control,value);
		} else {
			_this1.h[control] = value;
		}
	}
	,get_control_value: function(frameid,control) {
		var _this = this.players_controls;
		var _this1 = __map_reserved[frameid] != null?_this.getReserved(frameid):_this.h[frameid];
		if(__map_reserved[control] != null) {
			return _this1.getReserved(control);
		} else {
			return _this1.h[control];
		}
	}
	,get_qualities: function(frameid) {
		var _this = this.players_qualities;
		if(__map_reserved[frameid] != null) {
			return _this.getReserved(frameid);
		} else {
			return _this.h[frameid];
		}
	}
	,get_video_info: function(frameid) {
		var _this = this.players_videos_info;
		if(__map_reserved[frameid] != null) {
			return _this.getReserved(frameid);
		} else {
			return _this.h[frameid];
		}
	}
	,get_sources: function(frameid) {
		var _this = this.players_sources;
		if(__map_reserved[frameid] != null) {
			return _this.getReserved(frameid);
		} else {
			return _this.h[frameid];
		}
	}
	,set_video: function(frameid,source,video_id) {
		this.iwa.send_to_frame(frameid,JSON.stringify({ msg : "set_video", source : source, video : video_id}),"extraiwa");
	}
	,onmsg: function(data,element_id) {
		var data1 = JSON.parse(data);
		if(data1.msg == "set_controls") {
			var _g1 = 0;
			var _g = data1.controls.length;
			while(_g1 < _g) {
				var i = _g1++;
				var _this = this.players_controls;
				var key = data1.controls[i];
				var value = data1.values[i];
				var _this1 = __map_reserved[element_id] != null?_this.getReserved(element_id):_this.h[element_id];
				if(__map_reserved[key] != null) {
					_this1.setReserved(key,value);
				} else {
					_this1.h[key] = value;
				}
			}
		} else if(data1.msg == "update_control") {
			var _this2 = this.players_controls;
			var k = data1.control;
			var v = data1.value;
			var _this3 = __map_reserved[element_id] != null?_this2.getReserved(element_id):_this2.h[element_id];
			if(__map_reserved[k] != null) {
				_this3.setReserved(k,v);
			} else {
				_this3.h[k] = v;
			}
		} else if(data1.msg == "update_video") {
			var value1 = data1.duration;
			var _this4 = this.players_videos_duration;
			if(__map_reserved[element_id] != null) {
				_this4.setReserved(element_id,value1);
			} else {
				_this4.h[element_id] = value1;
			}
			var _g11 = 0;
			var _g2 = data1.info_keys.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				var _this5 = this.players_videos_info;
				var key1 = data1.info_keys[i1];
				var value2 = data1.info_value[i1];
				var _this6 = __map_reserved[element_id] != null?_this5.getReserved(element_id):_this5.h[element_id];
				if(__map_reserved[key1] != null) {
					_this6.setReserved(key1,value2);
				} else {
					_this6.h[key1] = value2;
				}
			}
		} else if(data1.msg == "update_qualities") {
			var v1 = data1.qualities;
			var _this7 = this.players_qualities;
			if(__map_reserved[element_id] != null) {
				_this7.setReserved(element_id,v1);
			} else {
				_this7.h[element_id] = v1;
			}
		} else if(data1.msg == "update_time") {
			var v2 = data1.time;
			var _this8 = this.players_current_time;
			if(__map_reserved[element_id] != null) {
				_this8.setReserved(element_id,v2);
			} else {
				_this8.h[element_id] = v2;
			}
			var _this9 = this.time_functions;
			var the_time = (__map_reserved[element_id] != null?_this9.getReserved(element_id):_this9.h[element_id]).keys();
			while(the_time.hasNext()) {
				var the_time1 = the_time.next();
				if(the_time1 == data1.time) {
					var _this10 = this.time_functions;
					(__map_reserved[element_id] != null?_this10.getReserved(element_id):_this10.h[element_id]).h[the_time1](element_id);
				}
			}
		} else if(data1.msg == "update_sources") {
			var v3 = data1.sources;
			var _this11 = this.players_sources;
			if(__map_reserved[element_id] != null) {
				_this11.setReserved(element_id,v3);
			} else {
				_this11.h[element_id] = v3;
			}
		} else if(data1.msg == "update_status") {
			var v4 = data1.status;
			var _this12 = this.players_status;
			if(__map_reserved[element_id] != null) {
				_this12.setReserved(element_id,v4);
			} else {
				_this12.h[element_id] = v4;
			}
		}
	}
};
var haxe_IMap = function() { };
var haxe_ds_IntMap = function() { };
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) {
			a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	,existsReserved: function(key) {
		if(this.rh == null) {
			return false;
		}
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		return HxOverrides.iter(this.arrayKeys());
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) {
			out.push(key);
		}
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) {
				out.push(key.substr(1));
			}
			}
		}
		return out;
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
var __map_reserved = {}
fiwa_Fiwa.main();
})();
