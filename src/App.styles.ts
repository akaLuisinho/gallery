import styled from 'styled-components'

export const Container = styled.div`
    background-color: #27282F;
    color: #FFFFFF;
    min-height: 100vh;
`

export const Area = styled.div`
    margin: auto;
    max-width: 980px;
    padding: 30px 0px;
`

export const Header = styled.h1`
    margin: 0px;
    padding: 0px;
    text-align: center;
    margin-bottom: 30px;
`

export const ScreenWarning = styled.div`
    text-align: center;

    .emoji {
        font-size: 50px;
        margin-bottom: 20px;
    }
`

export const PhotoList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`

export const UploadForm = styled.form`
    background-color: #3D3F43;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 30px;

    input[type="submit"] {
        background-color: #756DF4;
        border: 0px;
        color: #FFFFFF;
        padding: 8px 16px;
        border-radius: 4px;
        margin: 0px 20px;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }
`
