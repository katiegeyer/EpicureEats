import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { updateUserThunk } from '../../store/users'
import { useModal } from '../../context/Modal'
import { useHistory } from 'react-router-dom'

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const [username, setUserName] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [err, setErr] = useState({})
    const [displayErr, setDisplayErr] = useState(false)
    const [changed, setChanged] = useState(false)

    // useEffect(() => {
    //     const errors = {}
    //     if (!username) errors.username = "Username is required"
    //     if (username.length < 4) errors.usernameLengthSmall = "Username is under 4 characters"
    //     if (username.length > 20) errors.usernameLengthLarge = "Username is over 20 characters"
    //     if (!email.includes('@')) errors.email = "Invalid Email"
    //     if (!email.includes('.com' || '.edu' || '.net' || '.org' || '.gov')) errors.email = "Invalid Email"

    //     // if (!img.endsWith('.png') && !img.endsWith('.jpg') && !img.endsWith('.jpeg')) errors.img = "Image URL needs to end in jpg or png"
    //     setErr(errors)
    // }, [username, email])

    const cancelHandler = () => {
        closeModal()

    }

    // const submitHandler = (e) => {
    //     e.preventDefault();

    //     const errors = {}
    //     if (!username) errors.username = "Username is required"
    //     if (username.length < 4) errors.usernameLengthSmall = "Username is under 4 characters"
    //     if (username.length > 20) errors.usernameLengthLarge = "Username is over 20 characters"

    //     // Check if email is valid
    //     if (!email.includes('@')) errors.email = "Invalid Email"
    //     if (!email.includes('.com' || '.edu' || '.net' || '.org' || '.gov')) errors.email = "Invalid Email"

    //     setErr(errors)

    //     if (Object.keys(errors).length > 0) {
    //         setDisplayErr(true)
    //         return
    //     }
    //     else {
    //         const newUser = { username: username, email: email }
    //         dispatch(updateUserThunk(newUser, user.id))
    //         history.push(`/`)
    //     }
    //     closeModal()
    //     window.location.reload();
    // }
    const submitHandler = (e) => {
        e.preventDefault();

        const errors = {}
        if (username !== user.username) {
            if (!username) errors.username = "Username is required"
            if (username.length < 4) errors.usernameLengthSmall = "Username is under 4 characters"
            if (username.length > 20) errors.usernameLengthLarge = "Username is over 20 characters"
        }

        // Check if email is valid
        if (email !== user.email) {
            if (!email.includes('@') || (!email.includes('.com') && !email.includes('.edu') && !email.includes('.net') && !email.includes('.org') && !email.includes('.gov'))) errors.email = "Invalid Email";
        }

        setErr(errors)

        if (Object.keys(errors).length > 0) {
            setDisplayErr(true)
            return
        }
        else {
            const newUser = { username: username, email: email }
            dispatch(updateUserThunk(newUser, user.id))
            history.push(`/`)
        }
        closeModal()
        window.location.reload();
    }


    return (
        <>

            <div className='login-page'>
                <div className='login-modal'>
                    <div className='signup-modal-h1' >Edit your Profile</div>
                    {displayErr === true && err.email && (<div className="errors">· {err.email}</div>)}
                    {displayErr === true && err.username && (<div className="errors">· {err.username}</div>)}
                    {displayErr === true && err.usernameLengthSmall && (<div className="errors">· {err.usernameLengthSmall}</div>)}
                    {displayErr === true && err.usernameLengthLarge && (<div className="errors">· {err.usernameLengthLarge}</div>)}
                    <br />
                    <br />
                <form
                    className='update-profile-form'
                    action={`/ api / users / ${user.id}`}
                    method="PUT"
                    encType="multipart/form-data"
                    onSubmit={submitHandler}
                >
                    <label className="signup-modal-labels">
                        <div>Username</div>
                        <input
                            className="signup-modal-inputs"
                            type="text"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <br />
                    <label className="signup-modal-labels">
                        <div>Email</div>
                        <input
                            className="signup-modal-inputs"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <br />

                    <div className='update-profile-bottom'>
                        {/* <div className='upload-song-form-bottom-bar'> */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* <h5 style={{ fontSize: '12px', color: 'red' }} >*</h5> */}
                            {/* <h5>&nbsp;Required fields&nbsp;&nbsp;&nbsp;</h5> */}
                        </div>
                        <div className='update-profile-bottom-bar-button-div'>
                            <button
                                className='update-profile-bottom-bar-cancel'
                                onClick={cancelHandler}>
                                Cancel
                            </button>
                            <button
                                className='update-profile-bottom-bar-save'
                                onClick={submitHandler}
                                type='submit'>
                                Save
                            </button>
                        </div>
                        {/* </div> */}
                    </div>
                    {/* </div> */}
                </form>
                </div>

            </div>


            {/* // </div > */}

        </>

    )
}

export default UpdateProfile
