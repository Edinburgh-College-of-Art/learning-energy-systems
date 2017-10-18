<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Datasource\ConnectionManager as ConnectionManager;
use Cake\Event\Event as Event;

/**
 * AppData Controller
 *
 * @property \App\Model\Table\AppDataTable $AppData
 */
class AppDataController extends AppController
{

    /**
     * school method
     *
     * @param int|null $id school id
     * @return response
     */
    public function find_deep()
    {
        $this->layout = null;
        $school_name = $this->request->session()->read('Auth.User.school_name');
        if( strlen($school_name) < 1 ) {
            $this->response->statusCode(404);
            return $this->response;
        }

        $data = $this->AppData->find('all');
        $data->matching('AppStudents', function ($q) use ($school_name){
            return $q->where(['AppStudents.school_name' => $school_name]);
        });

        if($data->count() < 1)
        {
            $this->response->statusCode(404);
            return $this->response;
        }
        
        $this->response->body(json_encode(compact('data')));

        return $this->response;
            
     
    }

    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {
        $this->set('appData', $this->paginate($this->AppData));
        $this->set('_serialize', ['appData']);
    }

    /**
     * All method
     *
     * @return void
     */
    public function all()
    {
        $this->set('appData', $this->AppData->find('all'));
        $this->set('_serialize', ['appData']);
    }

    /**
     * View method
     *
     * @param string|null $id App Data id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        $this->set('appData', $this->$appData);
        $this->set('_serialize', ['appData']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $appData = $this->AppData->newEntity();
        if ($this->request->is('post')) {
            $appData = $this->AppData->patchEntity($appData, $this->request->data);
            if ($this->AppData->save($appData)) {
                $this->Flash->success(__('The app data has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The app data could not be saved. Please, try again.'));
            }
        }
        $this->set('_serialize', ['appData']);
    }

    /**
     * Edit method
     *
     * @param string|null $id App Data id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $appData = $this->AppData->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $appData = $this->AppData->patchEntity($appData, $this->request->data);
            if ($this->AppData->save($appData)) {
                $this->Flash->success(__('The app data has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The app data could not be saved. Please, try again.'));
            }
        }
        $this->set('_serialize', ['appData']);
    }

    /**
     * Delete method
     *
     * @param string|null $id App Data id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $appData = $this->AppData->get($id);
        if ($this->AppData->delete($appData)) {
            $this->Flash->success(__('The app data has been deleted.'));
        } else {
            $this->Flash->error(__('The app data could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}
