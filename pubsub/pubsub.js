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

    if (!this.handlersList[eventName]) {
        return handler;
    }

    this.handlersList[eventName].splice( this.handlersList[eventName].indexOf(handler), 1);

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

    if (this.handlersList[eventName]){
        for ( i = 0; i < this.handlersList[eventName].length; i++ ) {
            this.handlersList[eventName][i](data);
        }
        return true;
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

function a() {alert("aaa!");}
function c() {alert("ccc!");}
function b() {alert("bbb!");}

pubSub.subscribe('a', a);
pubSub.subscribe('a', b);
pubSub.subscribe('a', c);

pubSub.publish('a');
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
