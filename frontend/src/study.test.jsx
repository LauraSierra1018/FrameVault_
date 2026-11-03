// @vitest-environment jsdom
import React from 'react';
import {it,expect,vi,afterEach} from 'vitest';
import {render,screen,cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserStudy from './UserStudy.jsx';
afterEach(cleanup);
it('does not count a previously protected session as activation',async()=>{
 const user=userEvent.setup();const onStart=vi.fn();
 const {rerender}=render(<UserStudy session={{id:'old',state:'Protegido',files:[]}} onStart={onStart}/>);
 await user.click(screen.getByText(/Probar con una persona/));
 await user.click(screen.getByRole('button',{name:'Iniciar prueba de usuario'}));
 expect(onStart).toHaveBeenCalledOnce();
 expect(screen.getByText(/Esperando el primer respaldo/)).toBeTruthy();
 rerender(<UserStudy session={{id:'new',state:'Protegido',files:[{size:12}]}} onStart={onStart}/>);
 expect(screen.getByText(/Primer respaldo verificado registrado/)).toBeTruthy();
 expect(screen.getByRole('button',{name:'Finalizar y exportar resultado'}).disabled).toBe(true);
 await user.selectOptions(screen.getByLabelText('¿Explicó qué significa el verde?'),'No o parcialmente');
 expect(screen.getByRole('button',{name:'Finalizar y exportar resultado'}).disabled).toBe(false);
});
