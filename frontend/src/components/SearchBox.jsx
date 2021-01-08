import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = (props) => {
    const [keyword, setKeyword] = useState('')

    const onSubmitHandler = e => {
        e.preventDefault()
        if (keyword.trim()) {
            props.history.push(`/search/${keyword}`)
        } else {
            props.history.push('/')
        }
    }
    return (
        <Form onSubmit={onSubmitHandler} inline>
            <Form.Control type='text' name='q' placeholder='Search Products...' className='mr-sm-2 ml-sm-5' onChange={e => setKeyword(e.target.value)} >
            </Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
        </Form>
    )
}
export default SearchBox