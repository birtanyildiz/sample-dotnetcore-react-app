import React, { useState, useEffect } from 'react'
import { Variables } from '../Variables'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import * as Icon from 'react-bootstrap-icons';

export const MainPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    getCourses()
  }, [])


  const getCourses = async () => {
    try {
      const response = await fetch(`${Variables.apiUrl}/course/`)
      const data = await response.json()
      setCourses(data)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  const deleteCourse = async (id) => {
    if (!window.confirm('Silmek istediğinize emin misiniz?')) return;    
    try {
      await fetch(`${Variables.apiUrl}/course/${id}`, {
        method: 'DELETE',
      })
      getCourses()
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
          <h3>Eğitimler</h3>
        </div>
        <div className="col-md-6">
          <Link className="btn btn-primary float-end" to="/course/new">Yeni Eğitim</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
        <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Eğitim Adı</th>
                        <th scope="col">Başlangıç Zamanı</th>
                        <th scope="col">Bitiş Zamanı</th>
                        <th scope="col">Durum</th>
                        <th scope="col">İçerikler</th>
                        <th scope="col">Sil</th>
                    </tr>
                </thead>
                <tbody>
                {courses.length === 0 && (
                        <tr>
                            <td colSpan="5">İçerik bulunamadı</td>
                        </tr>
                    )}
                    {courses.map(course => (
                        <tr key={course.id}>
                            <th scope="row">{course.id}</th>
                            <td>{course.title}</td>
                            <td>{format(new Date(course.startDateTime), 'dd/MM/yyyy HH:mm')}</td>
                            <td>{format(new Date(course.endDateTime), 'dd/MM/yyyy HH:mm')}</td>
                            <td>{course.status ? <Icon.Check2Circle color='green'/>: <Icon.StopCircle color='red'/>}</td>
                            <td><Link className="btn btn-primary" to={`/course/${course.id}`}><Icon.List/></Link></td>
                            <td><button className="btn btn-danger" onClick={() => deleteCourse(course.id)}>Sil</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </>
  )
}
