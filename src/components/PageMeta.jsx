import {useEffect} from 'react';
export default function PageMeta({description}){useEffect(()=>{const tag=document.querySelector('meta[name="description"]');const previous=tag?.content;tag?.setAttribute('content',description);return()=>{if(previous)tag?.setAttribute('content',previous)}},[description]);return null}
