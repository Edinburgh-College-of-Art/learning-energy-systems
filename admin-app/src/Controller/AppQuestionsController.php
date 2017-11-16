<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * AppQuestions Controller
 *
 * @property \App\Model\Table\AppQuestionsTable $AppQuestions
 */
class AppQuestionsController extends AppController
{

    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {
        $this->set('appQuestions', $this->paginate($this->AppQuestions));
        $this->set('_serialize', ['appQuestions']);
    }

    /**
     * school method
     *
     * @param int|null $id school id
     * @return response
     */
    public function school() {
        $id = $this->request->params['app_school_id'];        
        $this->set('appQuestions', $this->AppQuestions->find()->where(['app_school_id =' => $id]));
        $this->set('_serialize', 'appQuestions');
    }

    /**
     * View method
     *
     * @param string|null $id App Question id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        $appQuestion = $this->AppQuestions->get($id, []);
        $this->set('appQuestion', $appQuestion);
        $this->set('_serialize', ['appQuestion']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $appQuestion = $this->AppQuestions->newEntity();

        if ($this->request->is('post')) {
            $appQuestion = $this->AppQuestions->patchEntity($appQuestion, $this->request->data);
            if ($this->AppQuestions->save($appQuestion)) {
                $this->Flash->success(__('The app question has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The app question could not be saved. Please, try again.'));
            }
        } else {
            $appSchools = $this->AppQuestions->AppSchool->find('list', ['limit' => 200]);
            $this->set(compact('appQuestion', 'appSchools'));
            $this->set('_serialize', ['appSchools']);
            $this->set('_serialize', ['appQuestion']);
        }
    }

    /**
     * Edit method
     *
     * @param string|null $id App Question id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $appQuestion = $this->AppQuestions->get($id, []);
        $this->set('appQuestion', $appQuestion);
        
        if ($this->request->is(['patch', 'post', 'put'])) {
            $appQuestion = $this->AppQuestions->patchEntity($appQuestion, $this->request->data);
            if ($this->AppQuestions->save($appQuestion)) {
                $this->Flash->success(__('The app question has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The app question could not be saved. Please, try again.'));
            }
        }
        $this->set('_serialize', ['appQuestion']);
    }

    /**
     * Delete method
     *
     * @param string|null $id App Question id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $appQuestion = $this->AppQuestions->get($id);
        if ($this->AppQuestions->delete($appQuestion)) {
            $this->Flash->success(__('The app question has been deleted.'));
        } else {
            $this->Flash->error(__('The app question could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}
