import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

// import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
    const { currentUser } = useSelector(state => state.user)
    console.log('currentUser', currentUser);

    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
                console.log('landlord', data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLandlord();
    }, [listing.userRef]);


    const sendEmail = () => {
        emailjs.send(
            'service_dsvqzhe',
            'template_i7l7u2f',
            {
                subject: listing.name,
                senderName: currentUser.username,
                timestamp: new Date().toLocaleString(),
                body: message,
                receiverEmail: landlord.email,
                senderEmail: currentUser.email,
            },
            'L31MATSblIUfijpE4'
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                toast.success('Successfully send email!');
                setMessage('');
            })
            .catch((err) => {
                console.error('FAILED...', err);
            });
    };

    return (
        <>
            {landlord && (
                <div className='flex flex-col gap-2'>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <p>
                        Contact <span className='font-semibold'>{landlord.username}</span>{' '}
                        for{' '}
                        <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        name='message'
                        id='message'
                        rows='2'
                        value={message}
                        onChange={onChange}
                        placeholder='Enter your message here...'
                        className='w-full border p-3 rounded-lg'
                    ></textarea>

                    <button
                        onClick={sendEmail}
                        className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                    >
                        Send Message
                    </button>



                </div>
            )}
        </>
    );
}