import { Container } from './styles'

type Props = {
    name: string;
    url: string;
}

export function PhotoItem({name, url}: Props) {
    return (
        <Container>
            <img src={url} alt={name}/>
            {name}
        </Container>
    )
}