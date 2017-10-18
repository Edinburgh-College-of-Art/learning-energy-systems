<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * AppStudents Controller
 *
 * @property \App\Model\Table\AppStudentsTable $AppStudents
 */
class AppStudentsController extends AppController
{

    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['AppSchools']
        ];
        $this->set('appStudents', $this->paginate($this->AppStudents));
        $this->set('_serialize', ['appStudents']);
    }

    /**
     * View method
     *
     * @param string|null $id App Student id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        $appStudent = $this->AppStudents->get($id, [
            'contain' => ['AppSchools']
        ]);
        $this->set('appStudent', $appStudent);
        $this->set('_serialize', ['appStudent']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $appStudent = $this->AppStudents->newEntity();
        if ($this->request->is('post')) {
            $appStudent = $this->AppStudents->patchEntity($appStudent, $this->request->data);
            if ($this->AppStudents->save($appStudent)) {
                $this->Flash->success(__('The app student has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The app student could not be saved. Please, try again.'));
            }
        }
        $appSchools = $this->AppStudents->AppSchools->find('list', ['limit' => 200]);
        $uniques = $this->AppStudents->Uniques->find('list', ['limit' => 200]);
        $this->set(compact('appStudent', 'appSchools', 'uniques'));
        $this->set('_serialize', ['appStudent']);
    }

    /**
     * Edit method
     *
     * @param string|null $id App Student id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $appStudent = $this->AppStudents->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $appStudent = $this->AppStudents->patchEntity($appStudent, $this->request->data);
            if ($this->AppStudents->save($appStudent)) {
                $this->Flash->success(__('The app student has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The app student could not be saved. Please, try again.'));
            }
        }
        $appSchools = $this->AppStudents->AppSchools->find('list', ['limit' => 200]);
        $uniques = $this->AppStudents->Uniques->find('list', ['limit' => 200]);
        $this->set(compact('appStudent', 'appSchools', 'uniques'));
        $this->set('_serialize', ['appStudent']);
    }

    /**
     * Delete method
     *
     * @param string|null $id App Student id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $appStudent = $this->AppStudents->get($id);
        if ($this->AppStudents->delete($appStudent)) {
            $this->Flash->success(__('The app student has been deleted.'));
        } else {
            $this->Flash->error(__('The app student could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}
