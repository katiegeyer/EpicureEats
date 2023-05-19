
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateRecipeThunk } from '../../store/recipes';
// import
// import { useHistory } from 'react-router-dom';
// import { useModal } from '../../context/Modal';
// import Upload from '../UploadImg';
// import './UpdatePlaylist.css'

// const UpdatePlaylistForm = ({ playlistId }) => {
//     const singlePlaylist = useSelector((state) => state.playlists.singlePlaylist);
//     // console.log('single playlist', singlePlaylist)
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { closeModal } = useModal();

//     const playlist = useSelector(state => state.playlists.singlePlaylist)


//     useEffect(() => {
//         const fetchPlaylistDetails = async () => {
//             const singlePlaylist = dispatch(getPlaylistThunk(playlistId));
//             if (singlePlaylist) {
//                 setName(singlePlaylist.name)
//                 setPublic(singlePlaylist.is_public)
//                 setDescription(singlePlaylist.description)
//                 setPreviewImg(playlist.preview_img || '')
//             }
//         }
//         fetchPlaylistDetails();
//     }, [dispatch, playlistId]);

//     const [name, setName] = useState(singlePlaylist.name)
//     const [description, setDescription] = useState(singlePlaylist.description)
//     const [is_public, setPublic] = useState(singlePlaylist.is_public)
//     const [preview_img, setPreviewImg] = useState('')




//     console.log('playlist id', playlistId)


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const updatedFormData = new FormData();
//         console.log('form data', updatedFormData);
//         updatedFormData.append('name', name)
//         updatedFormData.append('is_public', is_public)
//         updatedFormData.append('description', description)
//         updatedFormData.append('preview_img', preview_img)
//         // const updatedPlaylist = await dispatch(updatePlaylistThunk(playlistId, updatedFormData));
//         console.log('updated playlist', updatedFormData);
//         await dispatch(updatePlaylistThunk(playlistId, updatedFormData));
//         closeModal();
//         history.push(`/playlists/${playlistId}`);
//     }

//     return (
//         <>

//             <form
//                 className='create-playlist-form'
//                 // action={`/ api / playlists / ${playlistId}`}
//                 // method="PUT"
//                 encType="multipart/form-data"
//                 onSubmit={handleSubmit}
//             >
//                 <div className='upload-song-form-wrapped'>
//                     <div className='upload-song-form-info'>
//                         <div style={{ paddingBottom: '1rem' }}>
//                             <div>
//                                 <h5 style={{ display: 'inline-block', fontSize: '12px', color: 'red' }} >*</h5>
//                                 <label style={{ paddingBottom: '.5rem' }}>&nbsp;Title</label>
//                             </div>
//                             <input
//                                 className='upload-song-form-all-input upload-song-form-title'
//                                 type='text'
//                                 name='name'
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div>
//                                 <h5 style={{ display: 'inline-block', fontSize: '12px', color: 'red' }} >*</h5>
//                                 <label style={{ paddingBottom: '.5rem' }}>&nbsp;Is Public</label>
//                             </div>
//                         <input
//                             type="checkbox"
//                             name='is_public'
//                             checked={is_public}
//                             onChange={(e) => setPublic(e.target.value)}
//                         />
//                         <div style={{ paddingBottom: '1rem' }}>
//                             <div>
//                                 <h5 style={{ display: 'inline-block', fontSize: '12px', color: 'red' }} >*</h5>
//                                 <label style={{ paddingBottom: '.5rem' }}>&nbsp;Description</label>
//                             </div>
//                             <textarea
//                                 id="story"
//                                 name="description"
//                                 rows="5"
//                                 cols="40"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 required
//                             />
//                             {/* <label>
//                                 Preview Image:
//                                 <Upload onChange={(e) => setPreviewImg(e.target.files[0])} />
//                             </label> */}
//                         </div>
//                         {/* <div
//                                             style={{ paddingBottom: '1rem' }}
//                                         > */}
//                         {/* <div>
//                                             <h5 style={{ display: 'inline-block', fontSize: '12px', color: 'red' }} >*</h5>
//                                             <label style={{ paddingBottom: '.5rem' }}>
//                                                 &nbsp;Preview Image
//                                             </label>

//                                         </div>
//                                         <input
//                                             className='upload_playlist_img'
//                                             type='text'
//                                             name='preview_img'
//                                             value={formData.preview_img}
//                                             onChange={handleChange}
//                                             required
//                                         >

//                                         </input> */}
//                         {/* <label>
//                                             Preview Image:
//                                             <Upload onChange={(e) => handleChange({ target: { name: 'preview_img', value: e.target.files[0] } })} />

//                                             {/* <Upload onChange={(e) => setPreviewImg(e.target.files[0])} /> */}
//                         {/* </label> */}

//                         <div className='upload-song-form-bottom'>
//                             <div style={{ display: 'flex', alignItems: 'center' }}>
//                                 <h5 style={{ fontSize: '12px', color: 'red' }} >*</h5>
//                                 <h5>&nbsp;Required fields</h5>
//                             </div>
//                             <div className='upload-song-form-bottom-bar-button-div'>
//                                 <button type='submit'>Save</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </>
//     )
// }
// export default UpdatePlaylistForm
