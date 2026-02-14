'use strict';

QUnit.module('Тестируем функцию groupBy', () => {
    QUnit.test('Работает правильно с группировкой по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'vegetable', name: 'carrot' },
            { id: 4, category: 'fruit', name: 'orange' },
            { id: 5, category: 'vegetable', name: 'lettuce' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 4, category: 'fruit', name: 'orange' }
            ],
            vegetable: [
                { id: 3, category: 'vegetable', name: 'carrot' },
                { id: 5, category: 'vegetable', name: 'lettuce' }
            ]
        }, 'Объекты должны быть сгруппированы по категории');
    });

    QUnit.test('Работает правильно с пустым массивом', (assert) => {
        const emptyData = [];
        const result = groupBy(emptyData, 'category');

        assert.deepEqual(result, {}, 'Пустой массив должен возвращать пустой объект');
    });

    QUnit.test('Работает правильно, когда все объекты имеют одно значение по ключу', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'fruit', name: 'orange' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { id: 1, category: 'fruit', name: 'apple' },
                { id: 2, category: 'fruit', name: 'banana' },
                { id: 3, category: 'fruit', name: 'orange' }
            ]
        }, 'Все объекты должны быть сгруппированы под одним значением');
    });

    QUnit.test('Работает правильно, когда указанный ключ отсутствует', (assert) => {
        const data = [
            { id: 1, category: 'fruit', name: 'apple' },
            { id: 2, category: 'fruit', name: 'banana' },
            { id: 3, category: 'fruit', name: 'orange' }
        ];
        const result = groupBy(data, 'fruit');

        assert.deepEqual(result, {}, 'Несуществующий ключ возвращает пустой объект');
    });

    QUnit.test('Работает правильно с массивом одинаковых объектов', (assert) => {
        const data = [
            { category: 'fruit', name: 'apple' },
            { category: 'fruit', name: 'apple' },
            { category: 'fruit', name: 'apple' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            fruit: [
                { category: 'fruit', name: 'apple' },
                { category: 'fruit', name: 'apple' },
                { category: 'fruit', name: 'apple' }
            ]
        }, 'Все объекты должны быть в том же количестве, в каком они были в исходных данных');
    });

    QUnit.test('Работает правильно с массивом объектов, только в одном их которых есть ключ', (assert) => {
        const data = [
            { category: 'fruit', name: 'apple', price: '1.99' },
            { category: 'fruit', name: 'banana' },
            { category: 'fruit', name: 'orange' }
        ];
        const result = groupBy(data, 'price');

        assert.deepEqual(result, {
            '1.99': [
                { category: 'fruit', name: 'apple', price: '1.99' }
            ]
        }, 'Все объекты должны быть в том же количестве, в каком они были в исходных данных');
    });

    QUnit.test('Работает правильно с массивом объектов, в нескольких из которых есть ключ', (assert) => {
        const data = [
            { category: 'fruit', name: 'apple', price: '1.99' },
            { category: 'fruit', name: 'banana' },
            { category: 'fruit', name: 'orange', price: '2.49' }
        ];
        const result = groupBy(data, 'price');

        assert.deepEqual(result, {
            '1.99': [
                { category: 'fruit', name: 'apple', price: '1.99' },
            ],
            '2.49': [
                { category: 'fruit', name: 'orange', price: '2.49' },
            ]
        }, 'Все объекты должны быть в том же количестве, в каком они были в исходных данных');
    });

    QUnit.test('Работает правильно с массивом объектов, когда ключ некорректный (undefined, null, объект, и т.д.)', (assert) => {
        const data = [
            { undefined: 'fruit', name: 'apple', price: '1.99' },
            { category: 'fruit', name: 'banana', price: '2.99' },
            { category: 'fruit', name: 'orange', price: '2.49' }
        ];
        const result = groupBy(data, undefined);

        assert.deepEqual(result, {
            fruit: [
                { undefined: 'fruit', name: 'apple', price: '1.99' }
            ]
        }, 'Все объекты должны быть в том же количестве, в каком они были в исходных данных');
    });

    QUnit.test('Работает правильно с массивом объектов, когда значения ключа равны пустой строке', (assert) => {
        const data = [
            { category: '', name: 'apple', price: '1.99' },
            { category: '', name: 'banana', price: '2.99' },
            { category: 'fruit', name: 'orange', price: '2.49' }
        ];
        const result = groupBy(data, 'category');

        assert.deepEqual(result, {
            '': [
                { category: '', name: 'apple', price: '1.99' },
                { category: '', name: 'banana', price: '2.99' }
            ],
            'fruit': [
                { category: 'fruit', name: 'orange', price: '2.49' }
            ]
        }, 'Все объекты должны быть в том же количестве, в каком они были в исходных данных');
    });
});
