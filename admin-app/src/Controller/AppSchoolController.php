<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Datasource\ConnectionManager as ConnectionManager;
use Cake\Event\Event as Event;

/**
 * AppSchool Controller
 *
 * @property \App\Model\Table\AppSchoolTable $AppSchool
 */
class AppSchoolController extends AppController
{

    public function initialize()
    {
        $this->loadComponent('Flash');
        $this->loadComponent('Auth', [
            'loginRedirect' => [
                'controller' => 'AppSchool',
                'action' => 'index'
            ],
            'logoutRedirect' => [
                'controller' => 'AppSchool',
                'action' => 'login'
            ],
            'loginAction' => [
                'controller' => 'AppSchool',
                'action' => 'login'
            ],
            'authenticate' => [
                'Basic' => [
                    'userModel' => 'AppSchool'
                ],
                'Form' => [
                    'userModel' => 'AppSchool',
                    'fields' => ['username' => 'school_name', 'password' => 'password']
                ]
            ],
        ]);

    }

    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        $this->Auth->allow(['add', 'index', 'muhtest']);
    }
    

    /**
     * Index method
     *
     * @return void
     */
    public function index() {
        $isJson = $this->request->is('json');
        if ($isJson) { $this->set('appSchool', $this->AppSchool->find()->select(['school_name', 'id'])); }
        else { $this->set('appSchool', $this->paginate($this->AppSchool)); }
        $this->set('_serialize', ['appSchool']);
    }

    public function muhtest() {
        //$isJson = $this->request->is('json');
        $response = $this->response;
        $response->body("<b>Params</b> " . join('<br>', $this->request->params));
        return $response;
    }

    /**
     * View method
     *
     * @param string|null $id App School id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null) {
        $appSchool = $this->AppSchool->get($id, [
            'contain' => ['AppQuestions', 'AppStudents']
        ]);
        $this->set('appSchool', $appSchool);
        $this->set('_serialize', ['appSchool']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add() {
        $appSchool = $this->AppSchool->newEntity();
        if ($this->request->is('post')) {
            $appSchool = $this->AppSchool->patchEntity($appSchool, $this->request->data);
            if ($this->AppSchool->save($appSchool)) {
                $this->Flash->success(__('The app school has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The app school could not be saved. Please, try again.'));
            }
        }
        $this->set(compact('appSchool'));
        $this->set('_serialize', ['appSchool']);
    }

    /**
     * Edit method
     *
     * @param string|null $id App School id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null) {
        $appSchool = $this->AppSchool->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $appSchool = $this->AppSchool->patchEntity($appSchool, $this->request->data);
            if ($this->AppSchool->save($appSchool)) {
                $this->Flash->success(__('The app school has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The app school could not be saved. Please, try again.'));
            }
        }
        $this->set(compact('appSchool'));
        $this->set('_serialize', ['appSchool']);
    }

    /**
     * Delete method
     *
     * @param string|null $id App School id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null) {
        $this->request->allowMethod(['post', 'delete']);
        $appSchool = $this->AppSchool->get($id);
        if ($this->AppSchool->delete($appSchool)) {
            $this->Flash->success(__('The app school has been deleted.'));
        } else {
            $this->Flash->error(__('The app school could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }

    public function login() {
        if ($this->request->is('post')) {
            $appSchool = $this->Auth->identify();
            if ($appSchool) {
                $this->Auth->setUser($appSchool);
                return $this->redirect('../dashboard?les_school_id='.$appSchool->id);
            }
            $this->Flash->error(__('Invalid username or password, try again'));
        }
    }

    public function logout() {
        return $this->redirect($this->Auth->logout());
    }

    public function dash() {
    }

}
