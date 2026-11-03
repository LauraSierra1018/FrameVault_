// @vitest-environment jsdom
import React from 'react';
import {it,expect,vi,afterEach} from 'vitest';
import {render,screen,cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserStudy,{interpretResult} from './UserStudy.jsx';
afterEach(cleanup);
it('does not count a previously protected session as activation',async()=>{
 const user=userEvent.setup();const onStart=vi.fn();
 const {rerender}=render(<UserStudy session={{id:'old',state:'Protegido',files:[]}} onStart={onStart}/>);
 await user.click(screen.getByText(/Tu experiencia con FrameVault/));
 await user.click(screen.getByRole('button',{name:'Comenzar recorrido'}));
 expect(onStart).toHaveBeenCalledOnce();
 expect(screen.getByText(/Esperando el primer respaldo/)).toBeTruthy();
 rerender(<UserStudy session={{id:'new',state:'Protegido',files:[{size:12}]}} onStart={onStart}/>);
 expect(screen.getByText(/Primer respaldo verificado registrado/)).toBeTruthy();
 expect(screen.getByRole('button',{name:'Ver mi resumen'}).disabled).toBe(true);
 await user.selectOptions(screen.getByLabelText('¿Qué significa que un archivo esté en verde?'),'No o parcialmente');
 expect(screen.getByRole('button',{name:'Ver mi resumen'}).disabled).toBe(false);
});

it('shows a readable result without claiming that it has been saved',async()=>{
 const user=userEvent.setup();render(<UserStudy session={null} onStart={()=>{}}/>);
 await user.click(screen.getByText('Tu experiencia con FrameVault'));
 await user.click(screen.getByRole('button',{name:'Comenzar recorrido'}));
 await user.selectOptions(screen.getByLabelText('¿Qué significa que un archivo esté en verde?'),'No o parcialmente');
 await user.click(screen.getByRole('button',{name:'Ver mi resumen'}));
 expect(screen.getByRole('region',{name:'Resumen del recorrido'})).toBeTruthy();
 expect(screen.getByText('No completó un respaldo: revisen en qué paso se detuvo.')).toBeTruthy();
 expect(screen.getByRole('button',{name:'Descargar resultado'})).toBeTruthy();
 expect(screen.getByText(/No se guarda automáticamente en FrameVault/)).toBeTruthy();
});
it('distinguishes confidence from comprehension',()=>{
 const result=interpretResult({completedVerifiedBackup:true,helpRequests:2,understoodGreen:'No o parcialmente',confidenceBefore:1,confidenceAfter:5});
 expect(result[1]).toContain('2 veces');expect(result[2]).toContain('Conviene aclarar');expect(result[3]).toContain('entendió');
});
