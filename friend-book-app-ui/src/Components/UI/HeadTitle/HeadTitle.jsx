import React from 'react';

const HeadTitle = () => {
    return (
        <div>
            <div className="jumbotron mt-5 p-md-5 text-white rounded bg-dark" style={{marginBottom: 200}}>
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">Контакты</h1>
                    <p className="lead my-3">На этой странице вы можете просматрировать информацию о пользователях
                        </p>
                    <p className="lead mb-0"><a href={'https://github.com/Brikez7'} className="text-white font-weight-bold">Обратиться в поддержку</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeadTitle;