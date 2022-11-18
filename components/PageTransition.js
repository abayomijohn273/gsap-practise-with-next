import React, {useState, useEffect, useRef} from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from "styled-components"
import gsap from 'gsap'

const MainComponent = styled.div`
    transform-style: preserve-3d;

    &.page-enter-active {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 4;
        opacity: 0;

        backface-visibility: hidden;
    }

    &.page-enter-active, 
    &.page-exit-active {
        .page-transition-inner {
            height: 100vh;
            overflow: hidden;
            background: white;
        }
    }

    &.page-exit {

    }

    &.page-exit-active {
        backface-visibility: hidden;

        main {
            transform: translateY(-${props => props.routingPageOffset}px);
        }
    }

    &.page-enter-done {

    }
`;

const SecondaryComponent = styled.div`
    position: relative;
`

const Grid = styled.div`
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    display: grid;
    grid-template-rows: repeat(10, 1fr);
    grid-template-columns: repeat(10, 1fr);

    div {
        background: black;
        visibility: hidden;
    }
`

const PageTransition = ({ children, route, routingPageOffset }) => {
    const [transitioning, setTransitioning] = useState()

    const tl = useRef();
    const transitionRef = useRef()

    const onEnter = () => {
        tl.current.play(0);
        setTransitioning(true)
    }
    const onExited = () => {
        setTransitioning("")
    }

    useEffect(() => {
        if(!transitionRef.current) {
            return;
        }

        const squares = transitionRef.current.children;
        
        gsap.set(squares, {
            autoAlpha: 1
        })

        tl.current = gsap.timeline({
            repeat: 1,
            repeatDelay: 0.2,
            yoyo: true,
            paused: true
        }).fromTo(squares, {
            scale: 0,
            borderRadius: "100%"
        }, {
            scale: 1,
            borderRadius: 0,
            stagger: {
                grid: "auto",
                from: "edges",
                ease: "sine",
                amount: 0.5,
            }
        });

        return () => {
            tl.current.kill();
        }
    }, [])

    return (
        <>
            <TransitionGroup className={transitioning ? "transitioning" : ""}>
                <CSSTransition
                    key={route}
                    classNames={"page"}
                    timeout={1000}
                    onEnter={onEnter}
                    onExited={onExited}
                    // unmountOnExit
                >
                    <MainComponent routingPageOffset={routingPageOffset}>
                        <SecondaryComponent className="page-transition-inner">
                            {children}
                        </SecondaryComponent>
                    </MainComponent>
                </CSSTransition>
            </TransitionGroup>
            <Grid ref={transitionRef}>
                {[...Array(100)].map((_, i) => <div key={i} />) }
            </Grid>
        </>
    )
}

export default PageTransition