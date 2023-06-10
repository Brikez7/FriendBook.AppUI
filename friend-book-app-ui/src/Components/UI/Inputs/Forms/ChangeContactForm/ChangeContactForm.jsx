import React from 'react';
import './ChangeContactForm.modele.css';
import {updateMyContactInformation} from "../../../../../API/IdentityServer";

const ChangeContactForm = ({ userContact, changeContact,parseUserContact }) => {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        changeContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateMyContactInformation(userContact);
            if(response.message){
                alert(response.message)
                return;
            }
            parseUserContact(response.data)
        } catch (e) {
            console.error('Не удалось обновить информацию о контакте', e.message);
        }
    };

    return (
        <div className="container px-1 mt-5 pt-5 mb-5">
            <main role="main" className="pb-3">
                <form className="signup-form border shadow" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h1>Введите данные вашего контакта</h1>
                    </div>
                    <div className="form-body">
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">Полное имя</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="введите ваше полное имя"
                                    name="fullName"
                                    value={userContact.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group right">
                                <label className="label-title">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="введите ваш email"
                                    name="email"
                                    value={userContact.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="horizontal-group">
                            <div className="form-group left">
                                <label className="label-title">Проффесию</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="введите вашу проффесию"
                                    name="profession"
                                    value={userContact.profession}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group right">
                                <label className="label-title">Login</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="введите ваш логин"
                                    name="login"
                                    value={userContact.login}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label-title">Телефон</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="введите ваш телефон"
                                name="telephone"
                                value={userContact.telephone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-title">Общая информация</label>
                            <textarea
                                className="form-input"
                                rows="4"
                                cols="50"
                                style={{ height: 'auto' }}
                                name="info"
                                value={userContact.info}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className="btn btn-outline-light">
                            Изменить
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};
export default ChangeContactForm;