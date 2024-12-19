// import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import './css/index.css'
import { useCallback, useEffect, useState } from 'react'
import { useAuthContext, useCarritoContext } from '../../utils/contexts/useContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons'
import { formatNumPrecio } from '../../utils/helpers/NumFormat'
import { GetMethod } from '../../services/api/MongoDb/GetMethod'
import { putMethodSecured, putSecuredNotJson } from '../../services/api/MongoDb/PutMethod'
import { ReplaceSpaceTo } from '../../utils/helpers/ReplaceBlankSpace'

const EditProductPage = () => {
   const { id } = useParams()
   const { userAuth, } = useAuthContext()
   const { productosOfDb } = useCarritoContext()

   const [productEdit, setProductEdit] = useState({})

   
   const [formData, setFormData] = useState({
      marca: '',
      variedad: '',
      proceso: '',
      origen: '',
      altura: '',
      productor: '',
      bags: [], // { tamano: '', precio: 0, molienda: [] }
      perfil: {
         tueste: '',
         cuerpo: '',
         notas: [],
         puntaje: '50'
      },
      descripcion: '',
      // cardColor: ,
      userCoffee: userAuth?.userId?.id,
      recommended: false
   })

   const [formDataImg, setFormDataImg] = useState({
      imgs: []
   })

   const [formNotasPerfilData, setFormNPData] = useState({
      d1: '',
      d2: '50'
   })
   const [formBagsData, setFormBagsData] = useState({
      tamano: '',
      precio: '',
      molienda: []
   })
   const [formMsg, setFormMsg] = useState({
      marca: {
         error: false,
         msg: ''
      },
      variedad: {
         error: false,
         msg: ''
      },
      proceso: {
         error: false,
         msg: ''
      },
      origen: {
         error: false,
         msg: ''
      },
      altura: {
         error: false,
         msg: ''
      },
      productor: {
         error: false,
         msg: ''
      },
      tueste: {
         error: false,
         msg: ''
      },
      cuerpo: {
         error: false,
         msg: ''
      },
      puntaje: {
         error: false,
         msg: ''
      },
   })

   const inputChange = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const inputNestedChange = (e, category) => {
      const { value, name } = e.target
      setFormData({
         ...formData,
         [category]: {
            ...formData[category],
            [name]: value
         }
      })
   }

   const [notas, setNotas] = useState([])
   const inputNotasChange = (e) => {
      const { name, value } = e.target
      setFormNPData({
         ...formNotasPerfilData,
         [name]: value
      })
   }

   const addNota = (d1, d2) => {
      if (d1 !== '') {
         setNotas([
            ...notas,
            {
               d1: d1,
               d2: d2,
            }
         ])
      }
      setFormNPData({
         d1: '',
         d2: '50'
      })
   }

   const removeNota = (d1) => {
      const note = notas.filter(item => item.d1 !== d1)
      setNotas([...note])
   }

   const [bags, setBags] = useState([])
   const inputBagsChange = (e) => {
      const { name, value } = e.target
      setFormBagsData({
         ...formBagsData,
         [name]: value
      })
   }

   const inputBagsCheck = (e) => {
      const { name, checked } = e.target
      if (checked) {
         setFormBagsData({
            ...formBagsData,
            molienda: [
               ...formBagsData.molienda,
               name
            ]
         })
      } else {
         var mols = formBagsData.molienda.filter(item => item !== name)
         setFormBagsData({
            ...formBagsData,
            molienda: [...mols]
         })
      }
   }

   const addBag = () => {
      if (formBagsData.precio !== '' && formBagsData.tamano !== '') {
         setBags([
            ...bags,
            formBagsData,
         ])
      }
      setFormBagsData({
         tamano: '',
         precio: '',
         molienda: []
      })
   }

   const removeBag = (tamano) => {
      const bag = bags.filter(item => item.tamano !== tamano)
      setBags([...bag])
   }

   const [pLoaded, setPLoaded] = useState(null)

   const getPE = useCallback(async () => {
      const product = await GetMethod(`/productos/obtener/${id}`)
      console.log('ProductBd');
      console.log(product)
      if (product) {
         setFormData({
            ...product,
            userCoffee: product?.userCoffee?._id
         })
         setNotas([...product?.perfil?.notas?? []])
         setBags([...product?.bags?? []])
         setProductEdit({...product})
      }
   }, [id])

   useEffect(() => {
      if (pLoaded === null) {
         getPE()
         setPLoaded(true)
      }
      console.log(formData);
      
   }, [id, productosOfDb, productEdit, formData, pLoaded, getPE])

   const titlesMoliendas = (index) => {
      if (bags[index]?.molienda.length >= 1) {
         let aa = ''
         bags[index]?.molienda.forEach((mol) => {
            aa += `${mol}\n`
         })
         return aa
      }
      let r = 'Sin Moliendas Seleccionadas'
      return r
   }

   const sendForm = async (e) => {
      e.preventDefault()
      const data = new FormData()
      data.append('marca', formData.marca)
      data.append('variedad', formData.variedad)
      data.append('proceso', formData.proceso)
      data.append('origen', formData.origen)
      data.append('altura', formData.altura)
      data.append('productor', formData.productor)
      data.append('descripcion', formData.descripcion)
      
      bags.forEach((bag, index) => {
         data.append(`bags[${index}][tamano]`, bag.tamano)
         data.append(`bags[${index}][precio]`, bag.precio)
         bag.molienda.forEach((mol, mIndex) => {
            data.append(`bags[${index}][molienda][${mIndex}]`, mol)
         })
      })

      notas.forEach((nota, index) => {
         data.append(`perfil[notas][${index}][d1]`, nota.d1)
         data.append(`perfil[notas][${index}][d2]`, nota.d2)
      })

      data.append('perfil[tueste]', formData.perfil.tueste)
      data.append('perfil[cuerpo]', formData.perfil.cuerpo)
      data.append('perfil[puntaje]', formData.perfil.puntaje)
      data.append('userCoffee', formData.userCoffee)
      data.append('recommended', formData.recommended)

      console.log('Data');
      console.log(data);
      
      
      const a = await putSecuredNotJson(`/productos/actualizar/${id}`, userAuth?.userInfo, data)
      console.log(a?.dataRes);
      
      if (a?.type === "Success:") {
         alert(`${a?.type} ${a?.status} - ${a?.mensaje}`)
         // location.href = `/Coffee/View-Coffee/${ReplaceSpaceTo(a?.dataRes?.marca, '-')}/${a?.dataRes?._id}`
      } else if (a?.type === "Error:") {
         alert(`${a?.type} ${a?.status} - ${a?.mensaje}`)
      }
   }
   return (
      <>
         <div style={{ width: "85%", height: "auto", margin: "80px auto", background: "blue", border: "1px solid", borderRadius: "5px", padding: "10px" }}>
            <form onSubmit={(e) => sendForm(e)} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
               <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div style={{ position: "relative", width: "30%", height: "auto", padding: "4px", border: "1px solid", display: "flex", flexDirection: "column" }}>
                     <h2 style={{ margin: "5px 0px 0px 0px", textAlign: "center", padding: "0px" }}>Imagenes</h2>
                     <hr style={{ width: "98%", margin: "6px auto" }} />
                     <div style={{ height: "auto", minHeight: "110px", padding: "0px 1px", display: "flex", flexWrap: "wrap", gap: "8px 8px", }}>
                        {/* images.length >= 1 && (
                           images.map((image, index) => (
                              <div key={index} onClick={() => removeImage(index)} className='img-selected' style={{}}>
                                 <img src={previewUrls[index]} title='Remover Imagen' className='remove-hovered-img' height={"100%"} width={"100%"} alt={`Img ${image}`} />
                                 <div className="r-hovered-img"><FontAwesomeIcon icon={faRecycle} style={{ height: "2rem" }} /></div>
                              </div>
                           ))
                        )}
                        {images.length < 9 && (
                           <div title='Añadir Imagen' onClick={openFiles} className='add-image-b' style={{ width: "110px", height: "110px", background: "gray", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                              <FontAwesomeIcon icon={faPlus} style={{ width: "100%", height: "50%", }} />
                              <input type="file" id="fileInput" accept="image/*" multiple style={{ display: 'none' }} />
                           </div>
                        )*/}
                     </div>
                  </div>
                  <div style={{ width: "65%", height: "auto", padding: "4px 15px 8px 15px", border: "1px solid", display: "flex", flexDirection: "column" }}>
                     <h2 style={{ margin: "5px 0px 0px 0px", textAlign: "center", padding: "0px" }}>Perfil del Producto</h2>
                     <hr style={{ width: "100%", margin: "6px auto" }} />
                     <div style={{ height: "auto", padding: "0px 4px", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                        <div className="input-form flexed-2">
                           <label htmlFor="marca" className={`${formMsg.marca.error === true ? 'error-label' : ''}`}>Marca:</label>
                           <input type="text" name='marca' value={formData.marca} onChange={inputChange} id='marca' required className={`${formMsg.marca.error === true ? 'error-input' : ''}`} />
                           <span className={`msg-error-input ${formMsg.marca.error === true ? 'show-msg' : ''}`}>{formMsg.marca.msg}</span>
                        </div>
                        <div className="input-form flexed-2">
                           <label htmlFor="origen" className={`${formMsg.origen.error === true ? 'error-label' : ''}`}>Origen:</label>
                           <input type="text" name='origen' value={formData.origen} onChange={inputChange} id='origen' required className={`${formMsg.origen.error === true ? 'error-input' : ''}`} />
                           <span className={`msg-error-input ${formMsg.origen.error === true ? 'show-msg' : ''}`}>{formMsg.origen.msg}</span>
                        </div>
                        <div className="input-form flexed-2">
                           <label htmlFor="variedad" className={`${formMsg.variedad.error === true ? 'error-label' : ''}`}>Variedad:</label>
                           <input type="text" name='variedad' value={formData.variedad} onChange={inputChange} id='variedad' required className={`${formMsg.variedad.error === true ? 'error-input' : ''}`} />
                           <span className={`msg-error-input ${formMsg.variedad.error === true ? 'show-msg' : ''}`}>{formMsg.variedad.msg}</span>
                        </div>
                        <div className="input-form flexed">
                           <label htmlFor="proceso" className={`${formMsg.proceso.error === true ? 'error-label' : ''}`}>Proceso:</label>
                           <input type="text" name='proceso' value={formData.proceso} onChange={inputChange} id='proceso' required className={`${formMsg.proceso.error === true ? 'error-input' : ''}`} />
                           <span className={`msg-error-input ${formMsg.proceso.error === true ? 'show-msg' : ''}`}>{formMsg.proceso.msg}</span>
                        </div>
                        <div className="input-form flexed">
                           <label htmlFor="cuerpo" className={`${formMsg.cuerpo.error === true ? 'error-label' : ''}`}>Cuerpo:</label>
                           <input type="text" name='cuerpo' value={formData.perfil.cuerpo} onChange={(e) => inputNestedChange(e, 'perfil')} id='cuerpo' required className={`${formMsg.cuerpo.error === true ? 'error-input' : ''}`} />
                           <span className={`msg-error-input ${formMsg.cuerpo.error === true ? 'show-msg' : ''}`}>{formMsg.cuerpo.msg}</span>
                        </div>
                        <div className="input-form flexed-2">
                           <label htmlFor="tueste" className={`${formMsg.tueste.error === true ? 'error-label' : ''}`}>Tostión:</label>
                           <input type="text" name='tueste' value={formData.perfil.tueste} onChange={(e) => inputNestedChange(e, 'perfil')} id='tueste' required className={`${formMsg.tueste.error === true ? 'error-input' : ''}`} />
                           <span className={`msg-error-input ${formMsg.tueste.error === true ? 'show-msg' : ''}`}>{formMsg.tueste.msg}</span>
                        </div>
                        <div className="input-form flexed-2">
                           <label htmlFor="altura" className={`${formMsg.altura.error === true ? 'error-label' : ''}`}>Altura (m.s.n.m)</label>
                           <input type="text" name='altura' value={formData.altura} onChange={inputChange} id='altura' required className={`${formMsg.altura.error === true ? 'error-input' : ''}`} />
                           <span className={`msg-error-input ${formMsg.altura.error === true ? 'show-msg' : ''}`}>{formMsg.altura.msg}</span>
                        </div>
                        <div className="input-form flexed-2">
                           <label htmlFor="puntaje" className={`${formMsg.puntaje.error === true ? 'error-label' : ''}`}>Puntaje ({formData.perfil.puntaje})</label>
                           <input type="range" min={1} max={100} name='puntaje' value={formData.perfil.puntaje} onChange={(e) => inputNestedChange(e, 'perfil')} id='puntaje' required className={`${formMsg.puntaje.error === true ? 'error-input' : ''}`} />
                           <span className={`msg-error-input ${formMsg.puntaje.error === true ? 'show-msg' : ''}`}>{formMsg.puntaje.msg}</span>
                        </div>
                        <div className="input-form">
                           <label htmlFor="productor" className={`${formMsg.productor.error === true ? 'error-label' : ''}`}>Productor:</label>
                           <input type="text" name='productor' value={formData.productor} onChange={inputChange} id='productor' required className={`${formMsg.productor.error === true ? 'error-input' : ''}`} />
                           <span className={`msg-error-input ${formMsg.productor.error === true ? 'show-msg' : ''}`}>{formMsg.productor.msg}</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div style={{ width: "30%", height: "auto", padding: "4px", border: "1px solid", display: "flex", flexDirection: "column" }}>
                     <h2 style={{ margin: "5px 0px 0px 0px", textAlign: "center", padding: "0px" }}>Notas</h2>
                     <hr style={{ width: "98%", margin: "6px auto" }} />
                     <table className='table-data-p'>
                        <thead>
                           <tr>
                              <th style={{ textAlign: "left" }}>Sabor</th>
                              <th>%</th>
                              <th><FontAwesomeIcon icon={faTrashCanArrowUp} /></th>
                           </tr>
                        </thead>
                        <tbody>
                           {notas.length >= 1 ? (
                              notas.map((item, index) => (
                                 <tr key={index}>
                                    <td>{item.d1}</td>
                                    <td style={{ textAlign: 'center' }}>{item.d2}</td>
                                    <td style={{ textAlign: 'center' }} onClick={() => removeNota(item.d1)}><FontAwesomeIcon icon={faSquareMinus} /></td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan={3} style={{ textAlign: 'center' }}>Sin Sabores Añadidos</td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
                  {/* mT = -60px */}
                  <div style={{ marginTop: "0px", width: "65%", height: "auto", padding: "4px 15px 8px 15px", border: "1px solid", display: "flex", flexDirection: "column" }}>
                     <h2 style={{ margin: "5px 0px 0px 0px", textAlign: "center", padding: "0px" }}>Añadir Nota</h2>
                     <hr style={{ width: "98%", margin: "6px auto" }} />
                     <div style={{ height: "auto", padding: "0px 4px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="input-form flexed-2">
                           <label htmlFor="sabor">Sabor:</label>
                           <input type="text" name='d1' value={formNotasPerfilData.d1} onChange={inputNotasChange} id='sabor' />
                        </div>
                        <div className="input-form flexed-2">
                           <label htmlFor="porcentaje">Porcentaje ({formNotasPerfilData.d2}%)</label>
                           <input type="range" name='d2' value={formNotasPerfilData.d2} onChange={inputNotasChange} id='porcentaje' min={1} max={100} />
                        </div>
                        <button type='button' onClick={() => addNota(formNotasPerfilData.d1, formNotasPerfilData.d2)} style={{ width: "20%", padding: "0px", height: "45px", fontSize: "1rem", border: "none", borderRadius: "5px", cursor: "pointer", }}>Añadir</button>
                     </div>
                  </div>
               </div>
               <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div style={{ width: "30%", height: "auto", padding: "4px", border: "1px solid", display: "flex", flexDirection: "column" }}>
                     <h2 style={{ margin: "5px 0px 0px 0px", textAlign: "center", padding: "0px" }}>Bolsas</h2>
                     <hr style={{ width: "98%", margin: "6px auto" }} />
                     <table className='table-data-p'>
                        <thead>
                           <tr>
                              <th style={{ textAlign: "left" }}>Tamaño (gr/kg)</th>
                              <th>Precio</th>
                              <th><FontAwesomeIcon icon={faTrashCanArrowUp} /></th>
                           </tr>
                        </thead>
                        <tbody>
                           {bags.length >= 1 ? (
                              bags.map((item, index) => (
                                 <tr key={index} title={titlesMoliendas(index)}>
                                    <td>{item.tamano}</td>
                                    <td style={{ textAlign: 'center' }}>{formatNumPrecio(parseInt(item?.precio))}</td>
                                    <td style={{ textAlign: 'center' }} onClick={() => removeBag(item.tamano)}><FontAwesomeIcon icon={faSquareMinus} /></td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan={3} style={{ textAlign: 'center' }}>Sin Bolsas</td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
                  <div style={{ marginTop: "0px", width: "65%", height: "auto", padding: "4px 15px 8px 15px", border: "1px solid", display: "flex", flexDirection: "column" }}>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 10px" }}>
                        <h2 style={{ margin: "5px 0px 0px 0px", textAlign: "center", padding: "0px" }}>Añadir Bolsa</h2>
                        <button type='button' onClick={() => addBag()} style={{ width: "20%", padding: "0px", height: "40px", fontSize: "1rem", border: "none", borderRadius: "5px", cursor: "pointer", }}>Añadir</button>
                     </div>
                     <hr style={{ width: "98%", margin: "6px auto" }} />
                     <div style={{ height: "auto", padding: "0px 4px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "start" }}>
                        <div className="input-form flexed">
                           <label htmlFor="tamano">Tamaño de Bolsa (gr/kg)</label>
                           <input type="text" name='tamano' value={formBagsData.tamano} onChange={inputBagsChange} id='tamano' />
                        </div>
                        <div className="input-form flexed">
                           <label htmlFor="precio">Valor de Bolsa:</label>
                           <input type="number" name='precio' value={formBagsData.precio} onChange={inputBagsChange} id='precio' />
                        </div>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                           <h4>Tipo de Molienda:</h4>
                           <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                              <div style={{ width: "28%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                                 <div className="input-form checkbox">
                                    <label htmlFor="Grano">Grano</label>
                                    <input type="checkbox" name="Grano" id="Grano" checked={formBagsData.molienda.includes('Grano')} onChange={inputBagsCheck} />
                                 </div>
                                 <div className="input-form checkbox">
                                    <label htmlFor="Extra_Gruesa">Extra Gruesa</label>
                                    <input type="checkbox" name="Extra Gruesa" id="Extra_Gruesa" checked={formBagsData.molienda.includes('Extra Gruesa')} onChange={inputBagsCheck} />
                                 </div>
                                 <div className="input-form checkbox">
                                    <label htmlFor="Gruesa">Gruesa</label>
                                    <input type="checkbox" name="Gruesa" id="Gruesa" checked={formBagsData.molienda.includes('Gruesa')} onChange={inputBagsCheck} />
                                 </div>
                              </div>
                              <div style={{ width: "30%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                                 <div className="input-form checkbox">
                                    <label htmlFor="Media_Gruesa">Media-Gruesa</label>
                                    <input type="checkbox" name="Media-Gruesa" id="Media_Gruesa" checked={formBagsData.molienda.includes('Media-Gruesa')} onChange={inputBagsCheck} />
                                 </div>
                                 <div className="input-form checkbox">
                                    <label htmlFor="Media">Media</label>
                                    <input type="checkbox" name="Media" id="Media" checked={formBagsData.molienda.includes('Media')} onChange={inputBagsCheck} />
                                 </div>
                                 <div className="input-form checkbox">
                                    <label htmlFor="Media_Fina">Media-Fina</label>
                                    <input type="checkbox" name="Media-Fina" id="Media_Fina" checked={formBagsData.molienda.includes('Media-Fina')} onChange={inputBagsCheck} />
                                 </div>
                              </div>
                              <div style={{ width: "30%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                                 <div className="input-form checkbox">
                                    <label htmlFor="Fina">Fina</label>
                                    <input type="checkbox" name="Fina" id="Fina" checked={formBagsData.molienda.includes('Fina')} onChange={inputBagsCheck} />
                                 </div>
                                 <div className="input-form checkbox">
                                    <label htmlFor="Extra_Fina">Extra Fina</label>
                                    <input type="checkbox" name="Extra Fina" id="Extra_Fina" checked={formBagsData.molienda.includes('Extra Fina')} onChange={inputBagsCheck} />
                                 </div>
                                 <div className="input-form checkbox">
                                    <label htmlFor="Molido">Molido</label>
                                    <input type="checkbox" name="Molido" id="Molido" checked={formBagsData.molienda.includes('Molido')} onChange={inputBagsCheck} />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div style={{ width: "100%", display: "flex", justifyContent: "", alignItems: "start" }}>
                  <div style={{ marginTop: "0px", width: "97.4%", height: "auto", padding: "4px 15px 8px 15px", border: "1px solid", display: "flex", flexDirection: "column" }}>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 10px" }}>
                        <h2 style={{ margin: "5px 0px 0px 0px", textAlign: "center", padding: "0px" }}>Tras Nuestro Café:</h2>
                        <button type='submit' style={{ width: "20%", padding: "0px", height: "40px", fontSize: "1rem", border: "none", borderRadius: "5px", cursor: "pointer", }}>Guardar Producto</button>
                     </div>
                     <hr style={{ width: "98%", margin: "6px auto" }} />
                     <div className='input-form'>
                        <textarea name="descripcion" value={formData.descripcion} onChange={inputChange} id="descripcion" style={{ margin: "0px auto", width: "100%", padding: "10px 0px 0px 5px", fontSize: "16px" }} rows="15" placeholder='Descripción...'></textarea>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </>
   )
}

EditProductPage.propTypes = {
   // children: PropTypes.node
}

export default EditProductPage