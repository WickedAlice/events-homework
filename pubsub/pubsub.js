/**
 * Конструктор класса обмена сообщениями
 * @constructor
 */
function PubSub(){
	this.handlersList = {}
};

/**
 * Функция подписки на событие
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет вызвана при возникновении события
 * @return {function}         ссылка на handler
 */
PubSub.prototype.subscribe = function(eventName, handler) {

    if (!this.handlersList[eventName]) {
        this.handlersList[eventName] = [];
    }

    this.handlersList[eventName].push(handler); 

    return handler;
};

/**
 * Функция отписки от события
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет отписана
 * @return {function}         ссылка на handler
 */
PubSub.prototype.unsubscribe = function(eventName, handler) {

    var list = this.handlersList[eventName];

    if (!handler) {
        return undefined;
    }

    if (!list) {
        return handler;
    }

    list.splice(list.indexOf(handler), 1);

    return handler;
};

/**
 * Функция генерирующая событие
 * @param  {string} eventName имя события
 * @param  {object} data      данные для обработки соответствующими функциями
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.publish = function(eventName, data) {

    var i;
    var list = this.handlersList[eventName];

    if (list){

		for ( i = 0; i < list.length; i++ ) {
  			(function(func){
    			setTimeout(function(){
      			func(eventName, data);
    			}, 0);
  			})(list[i]);
		}
    }
    return false;
    
};

/**
 * Функция отписывающая все функции от определённого события
 * @param  {string} eventName имя события
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.off = function(eventName) {
    if (!this.handlersList[eventName]) {
        return false;
    }
    this.handlersList[eventName] = undefined;
    return true;
};

Function.prototype.subscribe = function(eventName) {
	var pubSub = new PubSub();
	pubSub.subscribe(eventName, this);

	Function.prototype.subscribe = function(eventName) {
   	pubSub.subscribe(eventName, this);
	} 

	PubSub.publish = function(eventName) {
   	pubSub.publish(eventName, this);
  	}

	Function.prototype.unsubscribe = function(eventName) {
	pubSub.unsubscribe(eventName, this);
	}

	PubSub.off = function(eventName) {
   	pubSub.off(eventName, this);
  	}
}

function foo(){alert("aaa")};

foo.subscribe('click');

PubSub.publish('click');

foo.unsubscribe('click');

PubSub.publish('click');

foo.subscribe('click');

PubSub.off('click');

PubSub.publish('click');
