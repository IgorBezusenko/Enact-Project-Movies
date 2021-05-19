import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import css from "./Form.module.less"
import {getToken} from "../../redux/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

export const Form = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.authReducer);
    const {token, loading, error} = state
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data) => {
        console.log(data)
        await dispatch(getToken(data.login, data.password))

    };
    return (
        <>{!!token && <Redirect to={"/home"}/>}
            {loading ? <p>Lading...</p> : <form onSubmit={handleSubmit(onSubmit)}>

                <h1>Авторизация</h1>
                {error && <p className={css.errors}>{error}</p>}
                <div className={css.formControl}>
                    <label htmlFor="login">Логин</label>
                    <input id={"login"}
                           {...register("login", {
                               required: "Поле обязательно для заполнения!",

                           })}
                    />
                    {/*<ErrorMessage errors={errors} name="login" as="p"/>*/}
                    <ErrorMessage
                        errors={errors}
                        name="login"
                        render={({message}) => <p className={css.errors}>{message}</p>}
                    />
                </div>
                <div className={css.formControl}>
                    <label htmlFor="password">Пароль</label>
                    <input id={"password"}
                           {...register("password", {
                               required: "Поле обязательно для заполнения!"
                           })}
                    />
                    {/*<ErrorMessage errors={errors} name="password" as="p"/>*/}
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({message}) => <p className={css.errors}>{message}</p>}
                    />
                </div>

                <button className={css.btn}>Войти</button>
            </form>}
        </>
    );
}
