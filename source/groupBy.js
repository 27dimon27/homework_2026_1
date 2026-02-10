'use strict';

/**
 * Группирует элементы массива по значению указанного ключа
 * @param {Array<Object>} data - массив объектов для группировки
 * @param {string} key - ключ, по которому производится группировка
 * 
 * @example
 * // returns { 'apple': [{fruit: 'apple', color: 'red'}], 'banana': [{fruit: 'banana', color: 'yellow'}] }
 * groupBy([{fruit: 'apple', color: 'red'}, {fruit: 'banana', color: 'yellow'}], 'fruit');
 * 
 * @returns {Object<string, Array>} объект, где ключи - уникальные значения ключа, а значения - массивы объектов, соответствующих этому ключу
 */
function groupBy(data, key) {
    if (data.length > 0 && !data[0].hasOwnProperty(key)) {
        return [];
    }

    return data.reduce((result, item) => {
        const keyValue = item[key];

        if (!result[keyValue]) {
            result[keyValue] = [];
        }

        result[keyValue].push(item);

        return result;
    }, {});
}