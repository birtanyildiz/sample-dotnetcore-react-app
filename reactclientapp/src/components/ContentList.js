import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Variables } from '../Variables'
import { Link } from 'react-router-dom'

export const ContentList = () => {
    const { id } = useParams();
    const [contents, setContents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getContents()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
    const getContents = async () => {
        try {
            const response = await fetch(`${Variables.apiUrl}/course/${id}/content`)
            const data = await response.json()
            setContents(data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    const deleteContent = async (id) => {
        if (!window.confirm('Silmek istediğinize emin misiniz?')) return;
        try {
            await fetch(`${Variables.apiUrl}/content/${id}`, {
                method: 'DELETE',
            })
            getContents()
        } catch (error) {
            console.log(error)
        }
    }



    if (loading) return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
    if (error) return (
        <div className="alert alert-danger" role="alert">
            {error.message} {error.title}
            <p><Link className="btn btn-primary" to="/">Anasayfa</Link></p>
        </div>
    )
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <h3>"{contents.title}" eğitimine ait içerikler</h3>
                </div>
                <div className="col-md-6">
                    <Link className="btn btn-primary float-end" to={`/content/new/${contents.id}`}>Yeni İçerik</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">İçerik Başığı</th>
                                <th scope="col">Açıklama</th>
                                <th scope="col">Url</th>
                                <th scope="col">Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contents.contents.length === 0 && (
                                <tr>
                                    <td colSpan="5">İçerik bulunamadı</td>
                                </tr>
                            )}
                            {contents.contents.map(item => (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.url}</td>

                                    <td><button className="btn btn-danger" onClick={() => deleteContent(item.id)}>Sil</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
