import { Variables } from '../Variables'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'

export const NewCourse = () => {
    const { register, handleSubmit } = useForm();
    const onError = (errors, e) => console.log(errors, e);
    const navigate = useNavigate();

    const onSubmit = (data, e) => {
        data.startDateTime = new Date(data.startDateTime).toISOString();
        data.endDateTime = new Date(data.endDateTime).toISOString();
        e.preventDefault();
        fetch(Variables.apiUrl + '/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(() => {
                navigate('/');
            })
            .catch(err => {
               console.log(err)
            })

    };

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3>Yeni Kurs Ekle</h3>
                </div>
                <div className="col-md-12">
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Başlık</label>
                            <input type="text" className="form-control" {...register("title")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Başlangıç Zamanı</label>
                            <input type="datetime-local" className="form-control" {...register("startDateTime")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Bitiş Zamanı</label>
                            <input type="datetime-local" className="form-control" {...register("endDateTime")} />
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" {...register("status")} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Yayında mı?
                                </label>
                        </div>

                        <button type="submit" className="btn btn-primary">Ekle</button>

                    </form>

                </div>
            </div>

        </>
    )
}
