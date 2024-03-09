import axios from 'axios';
import md5 from 'md5';

const apiUrl = 'http://api.valantis.store:40000/';
const password = 'Valantis';

// Функция для формирования значения X-Auth
const generateXAuthHeader = () => {
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const authString = `${password}_${timestamp}`;
    return md5(authString);
};

// Функция для отправки запроса к API

export async function getIds(offset = 0, limit = 10) {
    const xAuthHeader = generateXAuthHeader();
    const headers = {
        'X-Auth': xAuthHeader
    };

    const requestData = {
        action: 'get_ids',
        params: {}
    };

    try {
        const response = await axios.post(apiUrl, requestData, { headers: headers });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching IDs:', error);
        throw new Error('Request failed');
    }
}

export async function getItems(ids) {
    const xAuthHeader = generateXAuthHeader();
    const headers = {
        'X-Auth': xAuthHeader
    };

    // Проверяем, что массив ids содержит хотя бы один элемент
    if (ids && ids.length > 0 && ids[0] !== null) {
        const requestData = {
            action: 'get_items',
            params: {
                ids: ids
            }
        };

        try {
            const response = await axios.post(apiUrl, requestData, { headers: headers });
            return response.data.result;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw new Error('Request failed');
        }
    } else {
        console.error('Invalid item ids provided');
        return [];
    }
}

export async function getFields(field, offset = 3, limit = 5) {
    const xAuthHeader = generateXAuthHeader();
    const headers = {
        'X-Auth': xAuthHeader
    };

    const requestData = {
        action: 'get_fields',
        params: {
            field: "brand",
            offset: offset,
            limit: limit
        }
    };

    try {
        const response = await axios.post(apiUrl, requestData, { headers: headers });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching fields:', error);
        throw new Error('Request failed');
    }
}

export async function filter(field, values) {
    const xAuthHeader = generateXAuthHeader();
    const headers = {
        'X-Auth': xAuthHeader
    };

    const requestData = {
        action: 'filter',
        params: {
            [field]: values
        }
    };

    try {
        const response = await axios.post(apiUrl, requestData, { headers: headers });
        return response.data.result;
    } catch (error) {
        console.error('Error filtering items:', error);
        throw new Error('Request failed');
    }
}

