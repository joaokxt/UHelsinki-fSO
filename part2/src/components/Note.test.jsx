import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    render(<Note note={note}/>)

    // screen.debug()
         // print raw HTML to cmd

    const element = screen.getByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined()
      // expect() runs a comparison
      // toBeDefined() tests whether the argument of expect() exists
})

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done with blablabla',
        important: true
    }

    const mockHandler = vi.fn()

    render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    const user = userEvent.setup() 
        // Session started to interact

    const button = screen.getByText('Make not important')
    await user.click(button)
        // Click button

    expect(mockHandler.mock.calls).toHaveLength(1)
        // Check if mock event hadler has been called ONCE
})