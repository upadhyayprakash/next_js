export default function Docs({ params }: { params: { slug: string[] } }) {
    if(params.slug?.length === 5)
        return <h1>{params.slug[0]} {" -> "}{params.slug[1]} {" -> "}{params.slug[2]} {" -> "}{params.slug[3]} {" -> "}{params.slug[4]}</h1>;
    else if(params.slug?.length === 4)
        return <h1>{params.slug[0]} {" -> "}{params.slug[1]} {" -> "}{params.slug[2]} {" -> "}{params.slug[3]}</h1>;
    else if(params.slug?.length === 3)
        return <h1>{params.slug[0]} {" -> "}{params.slug[1]} {" -> "}{params.slug[2]}</h1>;
    else if(params.slug?.length === 2)
        return <h1>{params.slug[0]} {" -> "}{params.slug[1]}</h1>;
    else if(params.slug?.length === 1)
        return <h1>{params.slug[0]}</h1>;
    else
        return <h1>Home Page</h1>
}
