import { Variables } from '../Variables'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom'


export const NewContent = () => {
    const { register, handleSubmit } = useForm();
    const onError = (errors, e) => console.log(errors, e);
    const navigate = useNavigate();
    const { id } = useParams();

    const onSubmit = (data, e) => {
        data.courseId = id;
        e.preventDefault();
        fetch(Variables.apiUrl + '/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(() => {
                navigate('/course/'+id);
            })
            .catch(err => {
               console.log(err)
            })

    };

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3>Yeni İçerik Ekle</h3>
                </div>
                <div className="col-md-12">
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Başlık</label>
                            <input type="text" className="form-control" {...register("title")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Açıklama</label>
                            <textarea className="form-control" {...register("description")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Url</label>
                            <input type="text" className="form-control" {...register("url")} />
                        </div>
                    

                        <button type="submit" className="btn btn-primary">Ekle</button>

                    </form>

                </div>
            </div>

        </>
    )
}
