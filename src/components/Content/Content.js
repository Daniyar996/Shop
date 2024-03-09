import React, { useEffect, useState } from 'react';
import './content.css';
import { getIds, getItems, getFields } from "../../api";
import { Button, Card, Checkbox, InputNumber, Slider, Spin } from "antd";
import ImgProduct from '../../../src/assets/img/c51c60ec32d476c5e27753767f3db4c2.jpg';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 50;
const { Meta } = Card;

const Content = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [priceRange, setPriceRange] = useState([4500, 90000]);
    const [brandFilters, setBrandFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prevPriceRange, setPrevPriceRange] = useState([4500, 90000]);

    // Пагинация
    useEffect(() => {
        const fetchData = async () => {
            try {
                const idsData = await getIds();
                const uniqueIds = Array.from(new Set(idsData));
                const totalPages = Math.ceil(uniqueIds.length / ITEMS_PER_PAGE);
                setTotalPages(totalPages);
                const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                const endIndex = currentPage * ITEMS_PER_PAGE;
                const currentPageIds = uniqueIds.slice(startIndex, endIndex);
                const itemsData = await getItems(currentPageIds);
                setItems(itemsData.sort((a, b) => a.price - b.price)); // Сортировка всех коллекций по возрастанию цен
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    // Фильтрация по бренду
    useEffect(() => {
        const fetchData = async () => {
            try {
                const brandsData = await getFields('brand');
                const filteredBrands = brandsData.filter(brand => brand !== null);
                setBrands(filteredBrands);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchData();
    }, []);

    // Применение фильтров
    useEffect(() => {
        const applyFilter = async () => {
            try {
                setLoading(true);
                let filteredItemsData = await filterItemsByPrice(priceRange[0], priceRange[1]);
                if (brandFilters.length > 0) {
                    filteredItemsData = filterItemsByBrand(filteredItemsData);
                }
                const uniqueFilteredIds = Array.from(new Set(filteredItemsData.map(item => item.id)));
                const uniqueFilteredItems = filteredItemsData.filter(item => uniqueFilteredIds.includes(item.id));
                const sortedFilteredItems = uniqueFilteredItems.sort((a, b) => a.price - b.price);
                setFilteredItems(sortedFilteredItems);
                setCurrentPage(1);
                setLoading(false);
            } catch (error) {
                console.error('Error applying filters:', error);
            }
        };

        if (filterApplied) {
            applyFilter();
        }
    }, [filterApplied, brandFilters, priceRange]);

    // Обработчик кнопки "Применить"
    const handleFilterButtonClick = () => {
        setFilterApplied(true);
        setPrevPriceRange([...priceRange]);
    };

    // Функция фильтрации по цене
    const filterItemsByPrice = async (minPrice, maxPrice) => {
        const idsData = await getIds();
        const itemsData = await getItems(idsData);
        return itemsData.filter(item => item.price >= minPrice && item.price <= maxPrice);
    };

    // Фильтрация товаров по бренду
    const filterItemsByBrand = (itemsData) => {
        return itemsData.filter(item => brandFilters.includes(item.brand));
    };

    // Изменение текущей страницы
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Изменение диапазона цен
    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    // Вызывается после изменения значений ползунков на слайдере
    const handleAfterPriceChange = () => {
        setFilterApplied(true);
    };

    // Отмена примененных фильтров и перезагрузка страницы
    const handleCancelFilter = () => {
        setPriceRange([...prevPriceRange]);
        setFilterApplied(false);
        window.location.reload(); // Перезагрузка страницы
    };

    return (
        <Spin spinning={loading}>
            <h2 style={{ textAlign: "center", fontStyle: 'italic' }}>{filterApplied ? `Фильтрованные по цене от ${priceRange[0]} до ${priceRange[1]} Pублей` : 'ВСЕ КОЛЛЕКЦИИ'}</h2>
            <div className='container'>
                <div className='filter-content'>
                    <h3>По Цене</h3>
                    <div className='InputFilter'>
                        От:
                        <InputNumber
                            value={priceRange[0]}
                        />
                    </div>
                    <div className='InputFilter'>
                        До:
                        <InputNumber
                            value={priceRange[1]}
                        />
                    </div>
                    <Slider
                        range
                        defaultValue={[4500, 90000]}
                        min={4500}
                        max={90000}
                        onChange={handlePriceChange}
                        onChangeComplete={handleAfterPriceChange}
                    />
                    <h3>По Бренду</h3>
                    <Checkbox.Group onChange={checkedValues => setBrandFilters(checkedValues)} value={brandFilters}>
                        {brands.map(brand => (
                            <Checkbox key={brand} value={brand}>{brand}</Checkbox>
                        ))}
                    </Checkbox.Group>
                    <div style={{ marginTop: 30, float: "right" }}>
                        {filterApplied && (
                            <Button onClick={handleCancelFilter}>Отменить</Button>
                        ) }
                    </div>
                </div>

                <div className='content-h1'>
                    {filterApplied ? (
                        filteredItems.slice(0, ITEMS_PER_PAGE).map(item => (
                            <div className='card-product' key={item.id}>
                                <Card
                                    style={{ width: 300, margin: '20px' }}
                                    cover={<img alt="product" src={ImgProduct} />}
                                    actions={[
                                        <span>{item.price} Рублей</span>,
                                        <Link to={`/modal_product/${item.id}`}><Button>Подробнее</Button></Link>
                                    ]}
                                >
                                    <Meta
                                        title={item.brand ? item.brand : "No Brand"}
                                        description={item.product}
                                    />
                                </Card>
                            </div>
                        ))
                    ) : (
                        items.slice(0, ITEMS_PER_PAGE).map(item => (
                            <div className='card-product' key={item.id}>
                                <Card
                                    style={{ width: 300, margin: '20px' }}
                                    cover={<img alt="product" src={ImgProduct} />}
                                    actions={[
                                        <span>{item.price} Рублей</span>,
                                        <Link to={`/modal_product/${item.id}`}><Button>Подробнее</Button></Link>
                                    ]}
                                >
                                    <Meta
                                        title={item.brand ? item.brand : "No Brand"}
                                        description={item.product}
                                    />
                                </Card>
                            </div>
                        )).sort((a, b) => a.price - b.price) // Сортировка по возрастанию цены
                    )}
                </div>

            </div>
            <div className='handle-page'>
                <div className='button-handle'>
                    <Button type="primary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Предыдущая страница
                    </Button>
                    <span style={{ padding: 10 }}>Страница {currentPage} из {totalPages}</span>
                    <Button type="primary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Следующая страница
                    </Button>
                </div>
            </div>
        </Spin>
    );
};

export default Content;
