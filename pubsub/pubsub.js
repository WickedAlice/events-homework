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


var pubSub = new PubSub();

function a() {console.log("111!");}
function b() {console.log("222!");}
function c() {
    var d = 9;
    for (var i = 0; i < 1000000000; i++ )
    {d++;}
    console.log ("done");
}
function d() {console.log("333!");}
function f() {console.log("444!");}
function g() {console.log("555!");}
function h() {console.log("666!");}
function j() {console.log("777!");}
function k() {console.log("888!");}
function l() {console.log("999!");}
function q() {console.log("qqq!");}
function w() {console.log("qqq!");}

pubSub.subscribe('a', a);
pubSub.subscribe('a', b);
pubSub.subscribe('a', c);
pubSub.subscribe('a', d);
pubSub.subscribe('a', f);
pubSub.subscribe('a', g);
pubSub.subscribe('a', h);
pubSub.subscribe('a', j);
pubSub.subscribe('a', k);
pubSub.subscribe('a', l);
pubSub.subscribe('a', q);
pubSub.subscribe('a', w);

pubSub.publish('a');
//console.log("faza 2");

pubSub.unsubscribe('a', a);
pubSub.publish('a');
pubSub.off('a');
pubSub.publish('a');

/**
 * @example
 *
 * PubSub.subscribe('click', function(event, data) { console.log(data) });
 * var second = PubSub.subscribe('click', function(event, data) { console.log(data) });
 *
 * //Отписать одну функцию от события 'click':
 * PubSub.unsubscribe('click', second);
 *
 * //Отписать группу функций от события 'click'
 * PubSub.off('click');
 */

