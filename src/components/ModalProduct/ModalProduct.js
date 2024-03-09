import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItems } from "../../api";
import {Spin, Image, Button, Breadcrumb} from "antd";
import ImgProduct from "../../assets/img/c51c60ec32d476c5e27753767f3db4c2.jpg";
import '../ModalProduct/Modal.css'


const ModalProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getItems([id]);
                setProduct(productData[0]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div>
            <Spin spinning={loading}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item href={'/content'}>ЮВЕЛИРНЫЕ ИЗДЕЛИЯ</Breadcrumb.Item>
                    <Breadcrumb.Item>{product ? product.product : 'Loading...'}</Breadcrumb.Item>
                </Breadcrumb>
                {product && (
                    <>
                        <div className='container'>
                        <Image width={500} src={ImgProduct}/>
                            <div className='about-modal'>
                                <h1>{product.product}</h1>
                                <p>{product.price} ₽</p>
                                <Button type={"primary"}>Заказать</Button>
                            </div>
                        </div>
                    </>
                )}
            </Spin>
        </div>
    );
};

export default ModalProduct;
