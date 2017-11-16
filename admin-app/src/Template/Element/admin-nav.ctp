<div class="actions columns large-2 medium-3">
  <h3><?= __('Navigation') ?></h3>
  <ul class="side-nav">

    <li><?= $this->Html->link(__('List Questions'), ['controller' => 'AppQuestions', 'action' => 'index']) ?></li>
    <li><?= $this->Html->link(__('List Students'), ['controller' => 'AppStudents', 'action' => 'index']) ?></li>
    <li><?= $this->Html->link(__('List Data'), ['controller' => 'AppData', 'action' => 'index']) ?></li>
    <li><?= $this->Html->link(__('Logout'), ['controller' => 'AppSchool', 'action' => 'logout']) ?></li>

  </ul>
</div>